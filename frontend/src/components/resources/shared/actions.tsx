import { IconType } from "react-icons";
import { LuDownload, LuPencilLine, LuPlus, LuTrash2 } from "react-icons/lu";

export interface ActionConfig<T> {
  key: string;
  label?: string;
  onClick: (resource: T) => unknown;
  icon?: IconType;
  visible?: boolean;
  bulkable?: boolean;
  destructive?: boolean;
  primary?: boolean;
  disabled?: boolean;
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

export const createActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    create: {
      key: "create",
      icon: LuPlus,
      onClick,
      primary: true,
    },
  };
};

export const editActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    edit: {
      key: "edit",
      label: "Edit",
      icon: LuPencilLine,
      onClick,
      disabled: true,
    },
  };
};

export const downloadActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    download: {
      key: "download",
      label: "Download",
      icon: LuDownload,
      onClick,
      disabled: true,
    },
  };
};

export const deleteActionConfigMap = <T,>(
  onClick: (resource: T) => unknown
): ActionMap<T> => {
  return {
    delete: {
      key: "delete",
      label: "Delete",
      icon: LuTrash2,
      onClick,
      destructive: true,
    },
  };
};
