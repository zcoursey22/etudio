import { useDeleteGoal } from "../../../hooks";
import { Goal } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useGoalActions = (overrides?: ActionOverrides<Goal>) => {
  const { deleteResource } = useDeleteGoal();

  return resolveActions<Goal>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
