import { Source } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useSourceActions = (overrides?: ActionOverrides<Source>) => {
  return resolveActions<Source>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
    },
    overrides
  );
};
