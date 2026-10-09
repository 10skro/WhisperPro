import { useMemo, useState } from "react";

import type {
  SettingsDrawerHandlers,
  SettingsDrawerModel,
  SettingsDrawerSetters
} from "../shared/panelContracts";
import DictationPane from "./DictationPane";
import WidgetPane from "./WidgetPane";
import ModelsSystemPane from "./ModelsSystemPane";

type SettingsDrawerProps = {
  model: SettingsDrawerModel;
  setters: SettingsDrawerSetters;
  handlers: SettingsDrawerHandlers;
};

type SettingsSection = "dictation" | "widget" | "models";

export default function SettingsDrawer({
  model,
  setters,
  handlers
}: SettingsDrawerProps) {
  const {
    open,
    uiText,
    settings,
    settingsState,
    settingsError,
    settingsDirty,
    shortcutDraft,
    isDownloadInProgress,
    downloadProgress
  } = model;
  const {
    onRequestClose,
    onSaveSettingsSnapshot,
    onResetSettings,
    onCancelModelDownload
  } = handlers;
  const [activeSection, setActiveSection] = useState<SettingsSection>("dictation");

  const sectionTabs = useMemo(
    () =>
      [
        { id: "dictation" as const, label: uiText.sectionDictation },
        { id: "widget" as const, label: uiText.sectionWidget },
        { id: "models" as const, label: uiText.sectionModelsSystem }
      ] satisfies Array<{ id: SettingsSection; label: string }>,
    [uiText]
  );

  if (!open) return null;

  const paneProps = { model, setters, handlers };

  return (
    <div className="overlay settings-overlay" onClick={onRequestClose}>
      <section className="panel settings-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="result-header settings-header">
          <h2>{uiText.options}</h2>
          <div className="inline-actions">
            <button type="button" className="ghost" onClick={onRequestClose}>
              {uiText.close}
            </button>
          </div>
        </div>

        <div className="settings-notice-stack">
          {isDownloadInProgress ? (
            <div className="progress-box settings-progress">
              <div className="inline-actions progress-header">
                <p className="history-time">{downloadProgress?.message ?? uiText.downloading}</p>
                <button type="button" className="secondary" onClick={onCancelModelDownload}>
                  {uiText.cancel}
                </button>
              </div>
              <div className="progress-track">
                <span
                  className="progress-fill"
                  style={{ width: `${Math.min(100, Math.max(2, downloadProgress?.progress_pct ?? 0))}%` }}
                />
              </div>
            </div>
          ) : null}
          {settingsDirty ? <p className="settings-warning">{uiText.unsavedChanges}</p> : null}
          {settingsError ? <p className="error settings-error">{settingsError}</p> : null}
        </div>

        <div className="settings-tabs" role="tablist" aria-label={uiText.options}>
          {sectionTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeSection === tab.id}
              className={`settings-tab ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeSection === "dictation" ? <DictationPane {...paneProps} /> : null}
          {activeSection === "widget" ? <WidgetPane {...paneProps} /> : null}
          {activeSection === "models" ? <ModelsSystemPane {...paneProps} /> : null}
        </div>

        <div className="settings-footer">
          <button
            type="button"
            className="danger"
            onClick={onResetSettings}
            disabled={settingsState === "saving"}
          >
            {uiText.reset}
          </button>
          <button
            type="button"
            className="primary"
            onClick={() => void onSaveSettingsSnapshot({ ...settings, shortcut: shortcutDraft.trim() || settings.shortcut })}
            disabled={settingsState === "saving"}
          >
            {settingsState === "saving" ? uiText.saving : uiText.save}
          </button>
        </div>
      </section>
    </div>
  );
}
