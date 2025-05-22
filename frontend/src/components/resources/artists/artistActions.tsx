import { Artist } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useArtistActions = (overrides?: ActionOverrides<Artist>) => {
  return resolveActions<Artist>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
    },
    overrides
  );
};
