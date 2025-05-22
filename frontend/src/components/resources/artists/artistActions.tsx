import { useDeleteArtist } from "../../../hooks";
import { Artist } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useArtistActions = (overrides?: ActionOverrides<Artist>) => {
  const { deleteResource } = useDeleteArtist();

  return resolveActions<Artist>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
