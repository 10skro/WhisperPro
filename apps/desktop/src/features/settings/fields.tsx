import type { ReactNode } from "react";

export function FieldLabel({ text, tip, ariaLabel }: { text: string; tip: string; ariaLabel: string }) {
  return (
    <span>
      {text}
      <button type="button" className="info-dot" title={tip} aria-label={ariaLabel}>
        ?
      </button>
    </span>
  );
}

export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="settings-group">
      <h3 className="settings-group-title">{title}</h3>
      {children}
    </section>
  );
}
