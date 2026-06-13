#!/usr/bin/env python3
"""Generate Next.js pages from exported Evida site HTML.

Extracts body markup and scripts from the source HTML archive, rewrites asset
paths, and emits a server page wrapper plus a client content component.
"""

import json
import re
from pathlib import Path

# Output dirs resolve relative to this script (apps/web/scripts/convert.py) so
# the generator works regardless of checkout location.
APP_ROOT = Path(__file__).resolve().parent.parent
# SOURCE_DIR is the external exported-HTML archive (outside this repo).
SOURCE_DIR = Path("/home/ubuntaman/projects/evida/old_website/evida-uk-clone/evida.uk")
PAGES_DIR = APP_ROOT / "src/app"
LIB_DIR = APP_ROOT / "src/lib"

DEFAULT_DESCRIPTION = (
    "Evida brings together your data, technology, and clinical expertise "
    "in a GP-led health check so that you can take action for a healthier you."
)

TITLE_OVERRIDES = {
    "About-us": "About Us",
    "How-it-works": "How It Works",
    "Privacy-policy": "Privacy Policy",
    "Contact-us": "Contact Us",
    "Posts": "Blog",
}

MAPPING = {
    "index.html": "page.tsx",
    "about-us.html": "about-us/page.tsx",
    "how-it-works.html": "how-it-works/page.tsx",
    "contact-us.html": "contact-us/page.tsx",
    "privacy-policy.html": "privacy-policy/page.tsx",
    "posts.html": "posts/page.tsx",
}

RELATIVE_PREFIX = r"(?:\.\./)+"


def extract_body(html: str) -> str:
    start = html.find("<body")
    if start == -1:
        raise ValueError("No <body tag")
    start = html.find(">", start) + 1
    end = html.rfind("</body>")
    return html[start:end]


def extract_head_styles(html: str) -> list[str]:
    blocks = []
    head_end = html.find("</head>")
    if head_end == -1:
        return blocks
    head = html[:head_end]
    for m in re.finditer(r'<style[^>]*>(.*?)</style>', head, re.DOTALL | re.IGNORECASE):
        content = m.group(1).strip()
        if content:
            blocks.append(content)
    return blocks


def extract_head_scripts(html: str) -> list[dict]:
    boilerplate_prefixes = [
        "WebFont.load",
        '!function(o,c){var n=c.documentElement,t=" w-mod-";',
    ]
    scripts = []
    head_end = html.find("</head>")
    if head_end == -1:
        return scripts
    head = html[:head_end]
    for m in re.finditer(r'<script\b([^>]*)>(.*?)</script>', head, re.DOTALL | re.IGNORECASE):
        attrs = m.group(1)
        content = m.group(2).strip()
        src_match = re.search(r'src="([^"]+)"', attrs)
        if src_match:
            continue
        if not content:
            continue
        if any(content.startswith(p) for p in boilerplate_prefixes):
            continue
        scripts.append({"src": None, "content": content})
    return scripts


def extract_metadata(html: str) -> dict[str, str]:
    title_m = re.search(r"<title>([^<]*)</title>", html)
    desc_m = re.search(
        r'<meta[^>]+name="description"[^>]+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    og_desc_m = re.search(
        r'<meta[^>]+property="og:description"[^>]+content="([^"]*)"',
        html,
        re.IGNORECASE,
    )
    raw_title = title_m.group(1).strip() if title_m else "Evida"
    description = ""
    if desc_m:
        description = desc_m.group(1).strip()
    elif og_desc_m:
        description = og_desc_m.group(1).strip()
    return {
        "title": format_page_title(raw_title),
        "description": description or DEFAULT_DESCRIPTION,
    }


def format_page_title(raw: str) -> str:
    label = TITLE_OVERRIDES.get(raw, raw.replace("-", " ").strip())
    if label.lower() == "evida":
        return "Evida"
    return f"{label} | Evida"


def fix_asset_paths(html: str) -> str:
    html = re.sub(
        RELATIVE_PREFIX + r"cdn\.prod\.website-files\.com/([^/\"')\s>]+)",
        r"/assets/\1",
        html,
    )
    html = re.sub(
        RELATIVE_PREFIX + r"ajax\.googleapis\.com/",
        "/assets/ajax.googleapis.com/",
        html,
    )
    html = re.sub(
        RELATIVE_PREFIX + r"js-na2\.hsforms\.net/",
        "/assets/js-na2.hsforms.net/",
        html,
    )
    html = re.sub(
        RELATIVE_PREFIX + r"cdn\.jsdelivr\.net/",
        "/assets/cdn.jsdelivr.net/",
        html,
    )
    html = re.sub(
        RELATIVE_PREFIX + r"d3e54v103j8qbb\.cloudfront\.net/",
        "/assets/d3e54v103j8qbb.cloudfront.net/",
        html,
    )
    html = re.sub(RELATIVE_PREFIX + r"assets/", "/assets/", html)
    return html


def fix_script_src(src: str) -> str:
    src = fix_asset_paths(src)
    src = re.sub(r"%3F.*$", "", src)
    src = re.sub(r"\?site=.*$", "", src)
    return src


def fix_known_issues(html: str, source_rel: str = "") -> str:
    html = re.sub(r'(<svg[^>]*?)\s+height="auto"', r"\1", html)
    html = re.sub(r"background-image:url\([^)]*?poster[^)]*\)[;]?", "", html)

    def clean_hidden_animation_styles(m):
        style = m.group(1)
        if "opacity:0" in style or "filter:blur" in style or "translate3d" in style:
            for prop in (
                r"filter:blur\([^)]*\)",
                r"opacity:0",
                r"[-a-zA-Z]*transform:translate3d\([^)]*\)\s*scale3d\([^)]*\)[^;]*",
            ):
                style = re.sub(prop, "", style)
            style = re.sub(r";\s*;+", ";", style).strip("; ")
        return 'style="' + style + '"'

    html = re.sub(r'style="(.*?)"', clean_hidden_animation_styles, html)
    html = re.sub(r'href="\.\./([^"#?]*)\.html(#?)"', r'href="/\1\2"', html)

    if source_rel.startswith("post/"):
        slug = Path(source_rel).stem
        html = re.sub(
            rf'href="{re.escape(slug)}\.html',
            f'href="/post/{slug}',
            html,
        )

    html = re.sub(r'href="([^"#/][^"#]*)\.html"', r'href="/\1"', html)
    html = re.sub(r'href="([^"#/][^"#]*)\.html(#)"', r'href="/\1\2"', html)
    html = re.sub(r'href="/index"', 'href="/"', html)
    html = re.sub(r"href=\"/index#", 'href="/#', html)
    return html


def strip_legacy_header(html: str) -> str:
    """Remove hidden Helixa template navbar left over on the home page export."""
    return re.sub(
        r'<header class="header-section">.*?</header>',
        "",
        html,
        count=1,
        flags=re.DOTALL,
    )


def _style_block_should_strip(content: str) -> bool:
    if ".w-nav-overlay" in content and "max-width: 1024px" in content:
        return True
    if '.nav-navbar path[fill="white"]' in content:
        return True
    if ".modal-overlay.is-open" in content and "popup modal" in content:
        return True
    if ".nav-wrapper" in content and "justify-content: space-between" in content:
        return True
    if ".navbar__logo-svg" in content and "max-width: 569px" in content:
        return True
    if ".w-nav-button.w--open" in content and "background-color: transparent" in content:
        return True
    if "html.w-mod-js:not(.w-mod-ix3)" in content and ".span-faq-item__toggle" in content:
        return True
    return False


def strip_shell_inline_styles(html: str) -> str:
    """Drop style blocks now covered by src/styles/interactions.css."""

    def repl(m: re.Match[str]) -> str:
        return "" if _style_block_should_strip(m.group(1)) else m.group(0)

    return re.sub(r"<style[^>]*>(.*?)</style>", repl, html, flags=re.DOTALL | re.IGNORECASE)


def extract_scripts(html: str):
    scripts = []
    pattern = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.DOTALL | re.IGNORECASE)

    def repl(m):
        attrs = m.group(1)
        content = m.group(2)
        src_match = re.search(r'src="([^"]+)"', attrs)
        src = fix_script_src(src_match.group(1)) if src_match else None
        scripts.append({
            "src": src,
            "content": content.strip() if not src_match else None,
        })
        return ""

    html = pattern.sub(repl, html)
    return html, scripts


def escape_for_template_literal(s: str) -> str:
    s = s.replace("\\", "\\\\")
    s = s.replace("`", "\\`")
    s = s.replace("${", "\\${")
    return s


INTERACTIONS_SCRIPT = (
    "// Evida site interactions: tabs, FAQ accordion (nav handled in PageClient)\n"
    "(function(){'use strict';\n"
    "if(window.__evidaInteractions)return;\n"
    "window.__evidaInteractions=true;\n"
    "document.querySelectorAll('.w-tab-menu').forEach(function(tabMenu){\n"
    "  var tabs=tabMenu.closest('.w-tabs');\n"
    "  if(!tabs)return;\n"
    "  tabMenu.querySelectorAll('.w-tab-link').forEach(function(link){\n"
    "    link.addEventListener('click',function(){\n"
    "      tabMenu.querySelectorAll('.w-tab-link').forEach(function(l){l.classList.remove('w--current');});\n"
    "      link.classList.add('w--current');\n"
    "      var target=link.getAttribute('data-w-tab');\n"
    "      tabs.querySelectorAll('.w-tab-pane').forEach(function(pane){\n"
    "        pane.classList.toggle('w--tab-active',pane.getAttribute('data-w-tab')===target);\n"
    "      });\n"
    "    });\n"
    "  });\n"
    "});\n"
    "document.querySelectorAll('.div-faq-item__trigger').forEach(function(trigger){\n"
    "  trigger.addEventListener('click',function(){\n"
    "    var item=trigger.closest('.div-faq-item');\n"
    "    if(!item)return;\n"
    "    var answer=item.querySelector('.div-faq-item__answer-div');\n"
    "    var toggle=item.querySelector('.span-faq-item__toggle');\n"
    "    if(!answer)return;\n"
    "    answer.classList.toggle('is-open');\n"
    "    if(toggle)toggle.classList.toggle('is-open');\n"
    "  });\n"
    "});\n"
    "document.querySelectorAll('.card-infographic, .card-paragraph').forEach(function(el){\n"
    "  if(el.style.display==='none')el.style.display='';\n"
    "});\n"
    "if(typeof ScrollTrigger!=='undefined'){\n"
    "  setTimeout(function(){ScrollTrigger.refresh();},300);\n"
    "}\n"
    "})();"
)


def build_script_queue(scripts: list) -> list:
    def is_kept(s):
        src = s.get("src") or ""
        if "jquery" in src:
            return False
        if "webflow" in src:
            return False
        if "/gsap/" in src or "gsap.min.js" in src or "ScrollTrigger" in src:
            return False
        content = s.get("content") or ""
        if "initLoopRail" in content:
            return False
        return True

    kept = [s for s in scripts if is_kept(s)]

    seen_srcs = set()
    deduped = []
    for s in kept:
        if s["src"]:
            if s["src"] in seen_srcs:
                continue
            if ("/gsap/" in s["src"] or "gsap.min.js" in s["src"]) and "jsdelivr" not in s["src"]:
                continue
            seen_srcs.add(s["src"])
        deduped.append(s)

    def sort_key(s):
        src = s.get("src") or ""
        if "hsforms" in src:
            return 0
        return 5

    sorted_scripts = sorted(deduped, key=sort_key)

    script_queue = []
    has_styled_hubspot = any(
        "applyFormStyles" in (s.get("content") or "")
        for s in sorted_scripts
    )

    for s in sorted_scripts:
        if s["src"]:
            script_queue.append({"src": s["src"]})
        elif s["content"]:
            content = s["content"]
            if (
                has_styled_hubspot
                and "hbspt.forms.create" in content
                and "applyFormStyles" not in content
            ):
                continue
            if "hbspt" in content:
                content = (
                    "if (typeof hbspt !== 'undefined') {\n"
                    + content
                    + "\n}"
                )
            if "DOMContentLoaded" in content and "addEventListener" in content:
                content = (
                    "(function(){"
                    "var _ae=document.addEventListener;"
                    "document.addEventListener=function(t,l,...r){"
                    "if(t==='DOMContentLoaded'&&document.readyState!=='loading'){l();return;}"
                    "return _ae.call(document,t,l,...r);"
                    "};"
                    + content
                    + "document.addEventListener=_ae;"
                    "})()"
                )
            script_queue.append({"inline": content})

    script_queue.append({"inline": INTERACTIONS_SCRIPT})
    return script_queue


def prepare_page(source_path: Path) -> tuple[str, list]:
    source_rel = str(source_path.relative_to(SOURCE_DIR))
    with open(source_path) as f:
        html = f.read()

    body = extract_body(html)
    body = fix_asset_paths(body)
    body = fix_known_issues(body, source_rel)

    if source_rel == "index.html":
        body = strip_legacy_header(body)

    body = strip_shell_inline_styles(body)

    head_styles = [
        block
        for block in extract_head_styles(html)
        if not _style_block_should_strip(block)
    ]
    if head_styles:
        style_block = "<style>\n" + "\n".join(head_styles) + "\n</style>\n"
        body = style_block + body

    body = strip_shell_inline_styles(body)

    body, scripts = extract_scripts(body)
    head_scripts = extract_head_scripts(html)
    scripts = head_scripts + scripts

    return body, build_script_queue(scripts)


def generate_site_scripts_ts(script_queue: list) -> str:
    return "\n".join([
        "// Auto-generated by scripts/convert.py — do not edit manually",
        "",
        "export type ScriptItem = { src?: string; inline?: string };",
        "",
        f"export const SHARED_SCRIPT_QUEUE: ScriptItem[] = {json.dumps(script_queue)};",
        "",
    ])


def generate_content_tsx(
    body_html: str,
    *,
    include_how_it_works_animator: bool = False,
) -> str:
    lines = [
        "// @ts-nocheck",
        "'use client'",
        "",
        "import PageClient from '@/components/PageClient'",
        "import { SHARED_SCRIPT_QUEUE } from '@/lib/site-scripts'",
    ]
    if include_how_it_works_animator:
        lines.append("import HowItWorksAnimator from './HowItWorksAnimator'")
    lines.extend([
        "",
        "const PAGE_HTML = `",
        escape_for_template_literal(body_html),
        "`",
        "",
        "export default function Content() {",
    ])
    if include_how_it_works_animator:
        lines.extend([
            "  return (",
            "    <>",
            "      <PageClient html={PAGE_HTML} scripts={SHARED_SCRIPT_QUEUE} />",
            "      <HowItWorksAnimator />",
            "    </>",
            "  );",
        ])
    else:
        lines.append("  return <PageClient html={PAGE_HTML} scripts={SHARED_SCRIPT_QUEUE} />;")
    lines.extend(["}", ""])
    return "\n".join(lines)


def generate_page_wrapper(metadata: dict[str, str], content_import: str, component_name: str) -> str:
    title = json.dumps(metadata["title"])
    description = json.dumps(metadata["description"])
    return "\n".join([
        "import type { Metadata } from 'next'",
        f"import {component_name} from '{content_import}'",
        "",
        "export const metadata: Metadata = {",
        f"  title: {title},",
        f"  description: {description},",
        "}",
        "",
        f"export default function Page() {{",
        f"  return <{component_name} />",
        "}",
        "",
    ])


def generate_blog_posts_ts(
    posts: dict[str, tuple[str, list, dict[str, str]]],
) -> str:
    lines = [
        "// @ts-nocheck",
        "// Auto-generated by scripts/convert.py — do not edit manually",
        "",
        "export type BlogPostMeta = { title: string; description: string }",
        "",
        f"export const BLOG_SLUGS = {json.dumps(sorted(posts.keys()))} as const;",
        "",
        "const BLOG_POST_DATA: Record<string, { html: string; meta: BlogPostMeta }> = {",
    ]

    for slug in sorted(posts.keys()):
        body_html, _script_queue, meta = posts[slug]
        lines.append(f'  "{slug}": {{')
        lines.append("    html: `")
        lines.append(escape_for_template_literal(body_html))
        lines.append("    `,")
        lines.append(f"    meta: {json.dumps(meta)},")
        lines.append("  },")

    lines.extend([
        "};",
        "",
        "export function getBlogPost(slug: string) {",
        "  return BLOG_POST_DATA[slug] ?? null;",
        "}",
        "",
    ])
    return "\n".join(lines)


def process_file(source_path: Path, output_rel: str) -> None:
    print(f"  Processing {source_path.name}...")
    with open(source_path) as f:
        html = f.read()

    metadata = extract_metadata(html)
    body_html, _script_queue = prepare_page(source_path)
    include_animator = "how-it-works" in output_rel

    if output_rel == "page.tsx":
        out_dir = PAGES_DIR
    else:
        out_dir = PAGES_DIR / Path(output_rel).parent

    content_path = out_dir / "content.tsx"
    page_path = out_dir / "page.tsx"

    out_dir.mkdir(parents=True, exist_ok=True)

    with open(content_path, "w") as f:
        f.write(generate_content_tsx(
            body_html,
            include_how_it_works_animator=include_animator,
        ))

    with open(page_path, "w") as f:
        f.write(generate_page_wrapper(metadata, "./content", "Content"))

    print(f"  Wrote {page_path} + {content_path}")


def discover_blog_posts() -> list[Path]:
    post_dir = SOURCE_DIR / "post"
    if not post_dir.is_dir():
        return []
    return sorted(post_dir.glob("*.html"))


def process_blog_posts() -> None:
    posts: dict[str, tuple[str, list, dict[str, str]]] = {}
    for source_path in discover_blog_posts():
        slug = source_path.stem
        print(f"  Processing blog post {slug}...")
        with open(source_path) as f:
            html = f.read()
        posts[slug] = (*prepare_page(source_path), extract_metadata(html))

    if not posts:
        print("  No blog posts found")
        return

    LIB_DIR.mkdir(parents=True, exist_ok=True)
    out_path = LIB_DIR / "blog-posts.ts"

    with open(out_path, "w") as f:
        f.write(generate_blog_posts_ts(posts))
    print(f"  Wrote {out_path}  [{len(posts)} post(s)]")


def main():
    shared_script_queue: list | None = None

    for source_name, output_rel in MAPPING.items():
        source_path = SOURCE_DIR / source_name
        if not source_path.exists():
            print(f"  SKIP {source_name}")
            continue
        if shared_script_queue is None:
            _, shared_script_queue = prepare_page(source_path)
            LIB_DIR.mkdir(parents=True, exist_ok=True)
            scripts_path = LIB_DIR / "site-scripts.ts"
            with open(scripts_path, "w") as f:
                f.write(generate_site_scripts_ts(shared_script_queue))
            print(f"  Wrote {scripts_path}  [{len(shared_script_queue)} scripts]")
        process_file(source_path, output_rel)

    process_blog_posts()


if __name__ == "__main__":
    main()
