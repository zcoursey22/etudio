import { useDeleteArrangement } from "../../../hooks";
import { Arrangement } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useArrangementActions = (
  overrides?: ActionOverrides<Arrangement>
) => {
  const { deleteResource } = useDeleteArrangement();

  return resolveActions<Arrangement>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...downloadActionConfigMap(({ name }) => console.log(`Download ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
