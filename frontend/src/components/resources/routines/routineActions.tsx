import { useDeleteRoutine } from "../../../hooks";
import { Routine } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useRoutineActions = (overrides?: ActionOverrides<Routine>) => {
  const { deleteResource } = useDeleteRoutine();

  return resolveActions<Routine>(
    {
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
