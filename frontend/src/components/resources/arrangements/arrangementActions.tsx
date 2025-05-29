import { useDeleteArrangement } from "../../../hooks";
import { Arrangement } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useArrangementActions = (
  overrides?: ActionOverrides<Arrangement>
) => {
  const { deleteResource } = useDeleteArrangement();

  return resolveActions<Arrangement>(
    {
      ...downloadActionConfigMap(({ name }) => console.log(`Download ${name}`)),
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(async ({ id }) => deleteResource(id)),
    },
    overrides
  );
};
