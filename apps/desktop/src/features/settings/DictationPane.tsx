import { LANGUAGE_OPTIONS } from "../shared/constants";
import type { UserSettings } from "../shared/types";
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

export default function DictationPane({ model, setters, handlers }: PaneProps) {
  const {
    settings,
    uiText,
    settingsState,
    shortcutDraft,
    capturingShortcut,
    inputDevices,
    inputDevicesBusy
  } = model;
  const { setSettings, setShortcutDraft, setCapturingShortcut, setStatusLine } = setters;
  const { onRefreshInputDevices } = handlers;

  return (
    <div className="settings-pane" role="tabpanel">
      <SettingsGroup title={uiText.groupRecognition}>
        <label className="field">
          <FieldLabel text={uiText.language} tip={uiText.tipRecognitionLanguage} ariaLabel={uiText.ariaHelpLanguage} />
          <select value={settings.language} onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}>
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {!LANGUAGE_OPTIONS.some((option) => option.value === settings.language) ? (
              <option value={settings.language}>{uiText.customLanguage} ({settings.language})</option>
            ) : null}
          </select>
        </label>

        <label className="field">
          <FieldLabel text={uiText.inputDevice} tip={uiText.tipInputDevice} ariaLabel={uiText.ariaHelpInputDevice} />
          <div className="inline-actions">
            <select
              value={settings.input_device_id}
              onChange={(e) => setSettings((s) => ({ ...s, input_device_id: e.target.value }))}
              disabled={inputDevicesBusy}
            >
              <option value="">{uiText.inputDeviceDefault}</option>
              {inputDevices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                  {device.is_default ? ` (${uiText.inputDeviceDefault})` : ""}
                </option>
              ))}
              {settings.input_device_id && !inputDevices.some((d) => d.id === settings.input_device_id) ? (
                <option value={settings.input_device_id}>
                  {uiText.inputDeviceUnavailable}
                </option>
              ) : null}
            </select>
            <button
              type="button"
              className="ghost"
              onClick={onRefreshInputDevices}
              disabled={inputDevicesBusy}
            >
              {uiText.refreshInputDevices}
            </button>
          </div>
        </label>
      </SettingsGroup>

      <SettingsGroup title={uiText.groupCapture}>
        <label className="field">
          <FieldLabel text={uiText.keyboardShortcut} tip={uiText.tipShortcut} ariaLabel={uiText.ariaHelpShortcut} />
          <div className="inline-actions">
            <input
              value={shortcutDraft}
              onChange={(e) => {
                const next = e.target.value;
                setShortcutDraft(next);
                setSettings((s) => ({ ...s, shortcut: next }));
              }}
              placeholder="Ctrl+Alt+Space"
              readOnly={capturingShortcut}
            />
            <button
              type="button"
              className={capturingShortcut ? "secondary" : "ghost"}
              onClick={() => {
                const next = !capturingShortcut;
                setCapturingShortcut(next);
                setStatusLine(next ? uiText.statusPressShortcut : uiText.statusCaptureCancelled);
              }}
              disabled={settingsState === "saving"}
            >
              {capturingShortcut ? uiText.cancelCapture : uiText.detectKeys}
            </button>
          </div>
        </label>

        <label className="field checkbox compact">
          <FieldLabel text={uiText.pushToTalkHold} tip={uiText.tipPushToTalkHold} ariaLabel={uiText.ariaHelpPushToTalkHold} />
          <input
            type="checkbox"
            checked={settings.push_to_talk_hold}
            onChange={(e) => setSettings((s) => ({ ...s, push_to_talk_hold: e.target.checked }))}
          />
        </label>

        <label className="field checkbox compact">
          <FieldLabel text={uiText.voicePunctuation} tip={uiText.tipVoicePunctuation} ariaLabel={uiText.ariaHelpPunctuation} />
          <input
            type="checkbox"
            checked={settings.voice_commands_enabled}
            onChange={(e) => setSettings((s) => ({ ...s, voice_commands_enabled: e.target.checked }))}
          />
        </label>

        <label className="field checkbox compact">
          <FieldLabel text={uiText.silenceGate} tip={uiText.tipSilenceGate} ariaLabel={uiText.ariaHelpSilenceGate} />
          <input
            type="checkbox"
            checked={settings.silence_gate_enabled}
            onChange={(e) => setSettings((s) => ({ ...s, silence_gate_enabled: e.target.checked }))}
          />
        </label>
      </SettingsGroup>

      <SettingsGroup title={uiText.groupPrivacy}>
        <label className="field checkbox compact">
          <FieldLabel text={uiText.secureTextMode} tip={uiText.tipSecureTextMode} ariaLabel={uiText.ariaHelpSecureTextMode} />
          <input
            type="checkbox"
            checked={settings.secure_text_mode}
            onChange={(e) => setSettings((s) => ({ ...s, secure_text_mode: e.target.checked }))}
          />
        </label>
      </SettingsGroup>
    </div>
  );
}
