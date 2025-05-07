import { createContext } from "react";

export interface Settings {
  syncListViewType: boolean;
}

type ISettingsContext = {
  settings: Settings;
  updateSettings: (updatedSettings: Partial<Settings>) => void;
  restoreDefaultSettings: () => void;
};

export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);
