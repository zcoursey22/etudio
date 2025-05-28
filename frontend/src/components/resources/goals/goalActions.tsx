import { useNavigate } from "react-router-dom";
import { useDeleteGoal } from "../../../hooks";
import { Goal } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";
import { getGoalListPath } from "../../../routes";

export const useGoalActions = (overrides?: ActionOverrides<Goal>) => {
  const { deleteResource } = useDeleteGoal();
  const navigate = useNavigate();
  const listPath = getGoalListPath();

  return resolveActions<Goal>(
    {
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => {
        deleteResource(id);
        if (location.pathname.startsWith(`${listPath}/`)) {
          navigate(listPath, { replace: true });
        }
      }),
    },
    overrides
  );
};
