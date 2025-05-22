import { useDeleteSupplementary } from "../../../hooks";
import { Supplementary } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useSupplementaryActions = (
  overrides?: ActionOverrides<Supplementary>
) => {
  const { deleteResource } = useDeleteSupplementary();

  return resolveActions<Supplementary>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...downloadActionConfigMap(({ name }) => console.log(`Download ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
