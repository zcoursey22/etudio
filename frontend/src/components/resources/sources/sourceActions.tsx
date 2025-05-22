import { useDeleteSource } from "../../../hooks";
import { Source } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useSourceActions = (overrides?: ActionOverrides<Source>) => {
  const { deleteResource } = useDeleteSource();

  return resolveActions<Source>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
