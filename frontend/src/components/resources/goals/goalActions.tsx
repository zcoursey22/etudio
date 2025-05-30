import { useNavigate } from "react-router-dom";
import { useDeleteGoal } from "../../../hooks";
import { Goal } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { getGoalListPath } from "../../../routes";
import { useState } from "react";
import { CreateGoalForm } from "./CreateGoalForm";

export const useGoalActions = (overrides?: ActionOverrides<Goal>) => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const closeModal = () => setModal(null);

  const { deleteResource } = useDeleteGoal();
  const navigate = useNavigate();
  const listPath = getGoalListPath();

  return {
    modal,
    actions: resolveActions<Goal>(
      {
        ...editActionConfigMap((goal) =>
          setModal(
            <ResourceModal
              title="Edit goal"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateGoalForm handleClose={closeModal} goal={goal} />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap(({ id }) => {
          deleteResource(id);
          if (location.pathname.startsWith(`${listPath}/`)) {
            navigate(listPath, { replace: true });
          }
        }),
      },
      overrides
    ),
  };
};
