import { Composition } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useCompositionActions = (
  overrides?: ActionOverrides<Composition>
) => {
  return resolveActions<Composition>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
    },
    overrides
  );
};
