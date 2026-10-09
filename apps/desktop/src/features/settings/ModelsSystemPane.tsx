import type {
  SettingsDrawerHandlers,
  SettingsDrawerModel,
  SettingsDrawerSetters
} from "../shared/panelContracts";
import ModelLibrary from "../models/ModelLibrary";
import { FieldLabel, SettingsGroup } from "./fields";

type PaneProps = {
  model: SettingsDrawerModel;
  setters: SettingsDrawerSetters;
  handlers: SettingsDrawerHandlers;
};

export default function ModelsSystemPane({ model, setters, handlers }: PaneProps) {
  const {
    settings,
    uiText,
    runtimeSetupBusy,
    computeModeOptions,
    computeCapability,
    isDownloadInProgress,
    models,
    modelsError,
    modelsBusy,
    downloadingModelId,
    modelDisplayLabel
  } = model;
  const { setSettings } = setters;
  const { onRepairRuntime, onDownloadModel, onRemoveModel } = handlers;

  return (
    <div className="settings-pane" role="tabpanel">
      <ModelLibrary
        uiText={uiText}
        modelPath={settings.model_path}
        models={models}
        modelsError={modelsError}
        modelsBusy={modelsBusy}
        isDownloadInProgress={isDownloadInProgress}
        downloadingModelId={downloadingModelId}
        modelDisplayLabel={modelDisplayLabel}
        onDownloadModel={onDownloadModel}
        onRemoveModel={onRemoveModel}
      />

      <SettingsGroup title={uiText.groupPerformance}>
        <label className="field">
          <FieldLabel text={uiText.computeMode} tip={uiText.tipComputeMode} ariaLabel={uiText.ariaHelpComputeMode} />
          <select
            value={settings.compute_mode}
            onChange={(e) => setSettings((s) => ({ ...s, compute_mode: e.target.value as SettingsDrawerModel["settings"]["compute_mode"] }))}
            disabled={runtimeSetupBusy}
          >
            {computeModeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value === "gpu" && computeCapability !== null && !computeCapability.gpu_available}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="settings-inline-actions">
          {computeCapability ? (
            <p className={`meta ${computeCapability.gpu_available ? "" : "warn"}`}>
              {computeCapability.gpu_available ? uiText.gpuDetected : uiText.gpuNotDetected} {computeCapability.details}
            </p>
          ) : null}
          <button type="button" className="ghost" onClick={onRepairRuntime} disabled={runtimeSetupBusy}>
            {runtimeSetupBusy ? uiText.checkRuntime : uiText.repairAcceleration}
          </button>
        </div>
      </SettingsGroup>

      <details className="settings-details">
        <summary>{uiText.advancedPaths}</summary>
        <label className="field">
          <FieldLabel text={uiText.whisperModelPath} tip={uiText.tipModelPath} ariaLabel={uiText.ariaHelpModelPath} />
          <input value={settings.model_path} onChange={(e) => setSettings((s) => ({ ...s, model_path: e.target.value }))} />
        </label>
        <label className="field">
          <FieldLabel text="whisper-cli.exe" tip={uiText.tipWhisperCliPath} ariaLabel={uiText.ariaHelpWhisperCli} />
          <input
            value={settings.whisper_cli_path}
            onChange={(e) => setSettings((s) => ({ ...s, whisper_cli_path: e.target.value }))}
          />
        </label>
      </details>
    </div>
  );
}
