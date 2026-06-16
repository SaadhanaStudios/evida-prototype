'use client';

import { useState, useEffect, useCallback } from 'react';

type VersionKey = 'v1' | 'v2' | 'v3';

const VERSIONS: Record<VersionKey, {
  label: string;
  tagline: string;
  'hero-headline': string;
  'hero-subtext': string;
  'hero-cta': string;
}> = {
  v1: {
    label: 'V1',
    tagline: 'More than a health check',
    'hero-headline': '<span class="subtitle-0">More than a </span><br><span class="subtitle-1">health check.</span>',
    'hero-subtext': 'Comprehensive blood tests, your wearable data, and<br>45 minutes with a GP who has time to listen.',
    'hero-cta': 'Get Started',
  },
  v2: {
    label: 'V2',
    tagline: 'Smarter prevention',
    'hero-headline': '<span class="subtitle-0">Smarter prevention, </span><span class="subtitle-1">built around you.</span>',
    'hero-subtext': 'Comprehensive blood tests, your wearable data, and<br>45 minutes with a GP who has time to listen.',
    'hero-cta': 'Get Started',
  },
  v3: {
    label: 'V3',
    tagline: 'Data to action',
    'hero-headline': '<span class="subtitle-0">Your health data, </span><br><span class="subtitle-1">finally turned into a plan.</span>',
    'hero-subtext': 'Blood panels, wearable metrics and medical history in one place — read by a real doctor, not an algorithm.',
    'hero-cta': 'Get Started',
  },
};

export default function CopyTester() {
  const [version, setVersion] = useState<VersionKey>('v1');
  const [editMode, setEditMode] = useState(false);

  const applyVersion = useCallback((v: VersionKey) => {
    const data = VERSIONS[v];

    const headline = document.querySelector<HTMLElement>('[data-copy-key="hero-headline"]');
    if (headline) headline.innerHTML = data['hero-headline'];

    const subtext = document.querySelector<HTMLElement>('[data-copy-key="hero-subtext"]');
    if (subtext) subtext.innerHTML = data['hero-subtext'];

    const cta = document.querySelector<HTMLElement>('[data-copy-key="hero-cta"]');
    if (cta) cta.textContent = data['hero-cta'];
  }, []);

  useEffect(() => {
    applyVersion(version);
  }, [version, applyVersion]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-copy-key]');
    els.forEach(el => {
      el.contentEditable = editMode ? 'true' : 'false';
      el.style.outline = editMode ? '2px dashed #FF5A5F' : 'none';
      el.style.outlineOffset = editMode ? '4px' : '0';
      el.style.borderRadius = editMode ? '4px' : '0';
    });
    return () => {
      els.forEach(el => {
        el.contentEditable = 'false';
        el.style.outline = 'none';
      });
    };
  }, [editMode]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        background: 'rgba(12, 12, 12, 0.94)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        fontFamily: 'var(--font-inter, -apple-system, sans-serif)',
        fontSize: '13px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        Copy
      </span>

      {(['v1', 'v2', 'v3'] as VersionKey[]).map(v => (
        <button
          key={v}
          onClick={() => setVersion(v)}
          title={VERSIONS[v].tagline}
          style={{
            padding: '5px 14px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: version === v ? '#FEF2A7' : 'rgba(255,255,255,0.14)',
            background: version === v ? '#FEF2A7' : 'transparent',
            color: version === v ? '#1a1200' : 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: version === v ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.12s ease',
            lineHeight: '1',
          }}
        >
          {VERSIONS[v].label}
        </button>
      ))}

      <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

      <button
        onClick={() => setEditMode(prev => !prev)}
        style={{
          padding: '5px 14px',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: editMode ? '#FF5A5F' : 'rgba(255,255,255,0.14)',
          background: editMode ? 'rgba(255,90,95,0.18)' : 'transparent',
          color: editMode ? '#FF8A8E' : 'rgba(255,255,255,0.6)',
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'all 0.12s ease',
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span>{editMode ? '✓' : '✎'}</span>
        <span>{editMode ? 'Done editing' : 'Edit copy'}</span>
      </button>
    </div>
  );
}
