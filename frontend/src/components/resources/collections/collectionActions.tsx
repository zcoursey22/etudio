import { useDeleteCollection } from "../../../hooks";
import { Collection } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useCollectionActions = (
  overrides?: ActionOverrides<Collection>
) => {
  const { deleteResource } = useDeleteCollection();

  return resolveActions<Collection>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
