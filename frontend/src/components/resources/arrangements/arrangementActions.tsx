import { useState } from "react";
import { Arrangement } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { CreateArrangementForm } from "./CreateArrangementForm";
import { DeleteArrangementForm } from "./DeleteArrangementForm";

export const useArrangementActions = (
  overrides?: ActionOverrides<Arrangement>
) => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Arrangement>(
      {
        ...downloadActionConfigMap(({ name }) =>
          console.log(`Download ${name}`)
        ),
        ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
        ...editActionConfigMap((arrangement) =>
          setModal(
            <ResourceModal
              title="Edit arrangement"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateArrangementForm
                handleClose={closeModal}
                arrangement={arrangement}
              />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((arrangement) =>
          setModal(
            <ResourceModal
              title="Delete arrangement"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteArrangementForm
                handleClose={closeModal}
                arrangement={arrangement}
              />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
