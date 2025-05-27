import { useDeleteGoal } from "../../../hooks";
import { Goal } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useGoalActions = (overrides?: ActionOverrides<Goal>) => {
  const { deleteResource } = useDeleteGoal();

  return resolveActions<Goal>(
    {
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
