import { useDeleteCollection } from "../../../hooks";
import { Collection } from "../../../models";
import {
  ActionOverrides,
  createActionConfigMap,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useCollectionActions = (
  overrides?: ActionOverrides<Collection>
) => {
  const { deleteResource } = useDeleteCollection();

  return resolveActions<Collection>(
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
