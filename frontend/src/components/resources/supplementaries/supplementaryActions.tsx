import { useDeleteSupplementary } from "../../../hooks";
import { Supplementary } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useSupplementaryActions = (
  overrides?: ActionOverrides<Supplementary>
) => {
  const { deleteResource } = useDeleteSupplementary();

  return resolveActions<Supplementary>(
    {
      ...downloadActionConfigMap(({ name }) => console.log(`Download ${name}`)),
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
