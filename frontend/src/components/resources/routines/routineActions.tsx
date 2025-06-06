import { ReactNode, useState } from "react";
import { Routine } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { DeleteRoutineForm } from "./DeleteRoutineForm";

export const useRoutineActions = (overrides?: ActionOverrides<Routine>) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Routine>(
      {
        ...editActionConfigMap((routine) =>
          setModal(
            <ResourceModal
              title="Edit routine"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateRoutineForm handleClose={closeModal} routine={routine} />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((routine) =>
          setModal(
            <ResourceModal
              title="Delete routine"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteRoutineForm handleClose={closeModal} routine={routine} />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
