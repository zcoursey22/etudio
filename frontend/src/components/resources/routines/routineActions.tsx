import { useDeleteRoutine } from "../../../hooks";
import { Routine } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useRoutineActions = (overrides?: ActionOverrides<Routine>) => {
  const { deleteResource } = useDeleteRoutine();

  return resolveActions<Routine>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
