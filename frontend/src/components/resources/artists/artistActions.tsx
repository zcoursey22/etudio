import { useDeleteArtist } from "../../../hooks";
import { Artist } from "../../../models";
import {
  ActionOverrides,
  createActionConfigMap,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useArtistActions = (overrides?: ActionOverrides<Artist>) => {
  const { deleteResource } = useDeleteArtist();

  return resolveActions<Artist>(
    {
      ...createActionConfigMap(({ name }) =>
        console.log(
          `This should open a menu to create one of the subresources for ${name}`
        )
      ),
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
