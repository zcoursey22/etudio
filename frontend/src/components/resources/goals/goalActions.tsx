import { Goal } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { ReactNode, useState } from "react";
import { CreateGoalForm } from "./CreateGoalForm";
import { DeleteGoalForm } from "./DeleteGoalForm";

export const useGoalActions = (overrides?: ActionOverrides<Goal>) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const closeModal = () => setModal(null);

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
        ...deleteActionConfigMap((goal) =>
          setModal(
            <ResourceModal
              title="Delete goal"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteGoalForm handleClose={closeModal} goal={goal} />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
