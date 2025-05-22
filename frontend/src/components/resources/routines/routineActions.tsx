import { Routine } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useRoutineActions = (overrides?: ActionOverrides<Routine>) => {
  return resolveActions<Routine>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
    },
    overrides
  );
};
