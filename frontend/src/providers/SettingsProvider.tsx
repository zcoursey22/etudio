import { PropsWithChildren } from "react";
import useLocalStorage from "use-local-storage";
import { Settings, SettingsContext } from "../contexts";

const KEY = "etudio_settings";

const initialSettings: Settings = {
  syncListViewType: true,
  darkModeInvertsPdfColors: true,
};

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [settings, setSettings] = useLocalStorage(KEY, initialSettings);

  const updateSettings = (updatedSettings: Partial<Settings>) => {
    setSettings({ ...settings, ...updatedSettings });
  };

  const restoreDefaultSettings = () => {
    updateSettings(initialSettings);
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, restoreDefaultSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
