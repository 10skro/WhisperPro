import type { WidgetThemeMode } from "../../i18n";
import type {
  SettingsDrawerHandlers,
  SettingsDrawerModel,
  SettingsDrawerSetters
} from "../shared/panelContracts";
import { FieldLabel, SettingsGroup } from "./fields";

type PaneProps = {
  model: SettingsDrawerModel;
  setters: SettingsDrawerSetters;
  handlers: SettingsDrawerHandlers;
};

export default function WidgetPane({ model, setters, handlers }: PaneProps) {
  const {
    settings,
    uiText,
    settingsState,
    widgetSoundOptions,
    previewSoundPlaying,
    widgetThemeMode,
    widgetSoundLabel
  } = model;
  const { setSettings } = setters;
  const {
    onSaveSettingsSnapshot,
    onWidgetSoundChange,
    onWidgetThemeModeChange,
    onWidgetSoundVolumeChange,
    onWidgetOpacityChange,
    onPreviewWidgetSound
  } = handlers;

  return (
    <div className="settings-pane" role="tabpanel">
      <SettingsGroup title={uiText.groupDisplay}>
        <label className="field checkbox">
          <FieldLabel text={uiText.showWidget} tip={uiText.tipWidget} ariaLabel={uiText.ariaHelpWidget} />
          <input
            type="checkbox"
            checked={settings.widget_enabled}
            onChange={(e) => {
              const next = { ...settings, widget_enabled: e.target.checked };
              setSettings(next);
              void onSaveSettingsSnapshot(next, e.target.checked ? "Mini-widget active" : "Mini-widget hidden");
            }}
            disabled={settingsState === "saving"}
          />
        </label>

        <label className="field">
          <FieldLabel text={uiText.widgetTheme} tip={uiText.tipWidgetTheme} ariaLabel={uiText.ariaHelpWidgetTheme} />
          <select value={widgetThemeMode} onChange={(e) => onWidgetThemeModeChange(e.target.value as WidgetThemeMode)}>
            <option value="follow">{uiText.widgetThemeFollowApp}</option>
            <option value="light">{uiText.widgetThemeLight}</option>
            <option value="dark">{uiText.widgetThemeDark}</option>
          </select>
        </label>

        <label className="field">
          <FieldLabel
            text={`${uiText.widgetOpacity} (${Math.round(settings.widget_opacity * 100)}%)`}
            tip={uiText.tipWidgetOpacity}
            ariaLabel={uiText.ariaHelpWidgetOpacity}
          />
          <input
            type="range"
            min={0.25}
            max={1}
            step={0.05}
            value={settings.widget_opacity}
            onChange={(e) => onWidgetOpacityChange(Number(e.target.value))}
          />
        </label>
      </SettingsGroup>

      <SettingsGroup title={uiText.groupSounds}>
        <label className="field">
          <FieldLabel text={uiText.widgetPopSound} tip={uiText.tipWidgetPopSound} ariaLabel={uiText.ariaHelpWidgetPopSound} />
          <select value={settings.widget_pop_sound} onChange={(e) => onWidgetSoundChange(e.target.value)}>
            {widgetSoundOptions.map((soundFile) => (
              <option key={soundFile} value={soundFile}>
                {widgetSoundLabel(soundFile)}
              </option>
            ))}
          </select>
          <div className="inline-actions">
            <button type="button" className="ghost" onClick={onPreviewWidgetSound} disabled={previewSoundPlaying}>
              {previewSoundPlaying ? uiText.previewingSound : uiText.previewSound}
            </button>
          </div>
        </label>

        <label className="field">
          <FieldLabel
            text={`${uiText.widgetPopSoundVolume} (${Math.round(settings.widget_pop_sound_volume * 100)}%)`}
            tip={uiText.tipWidgetPopSoundVolume}
            ariaLabel={uiText.ariaHelpWidgetPopSoundVolume}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.widget_pop_sound_volume}
            onChange={(e) => onWidgetSoundVolumeChange(Number(e.target.value))}
          />
        </label>
      </SettingsGroup>
    </div>
  );
}
