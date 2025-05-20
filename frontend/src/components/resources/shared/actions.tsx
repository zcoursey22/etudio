import { IconType } from "react-icons";
import { LuDownload, LuPencilLine, LuTrash2 } from "react-icons/lu";

export interface ActionConfig<T> {
  label: string;
  onClick: (resource: T) => unknown;
  icon?: IconType;
  visible?: boolean;
  bulkable?: boolean;
  color?: string;
}

export type ActionMap<T> = Record<string, ActionConfig<T>>;

export type ActionOverrides<T> = Partial<{
  [K in keyof ActionMap<T>]: Partial<ActionConfig<T>>;
}>;

export const resolveActions = <T,>(
  actions: ActionMap<T>,
  overrides?: ActionOverrides<T>
): ActionConfig<T>[] => {
  return Object.entries(actions)
    .map(([key, base]) => {
      const override = overrides?.[key];
      const merged = { ...base, ...override };
      return merged.visible === false ? null : merged;
    })
    .filter((a): a is ActionConfig<T> => a !== null);
};

// shared/default config builders

export const renameActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    rename: {
      label: "Rename",
      icon: LuPencilLine,
      onClick,
    },
  };
};

export const downloadActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    download: {
      label: "Download",
      icon: LuDownload,
      onClick,
    },
  };
};

export const deleteActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    delete: {
      label: "Delete",
      icon: LuTrash2,
      onClick,
      color: "fg.error",
    },
  };
};
