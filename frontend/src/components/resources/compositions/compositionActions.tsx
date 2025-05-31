import { useState } from "react";
import { Composition } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { CreateCompositionForm } from "./CreateCompositionForm";
import { DeleteCompositionForm } from "./DeleteCompositionForm";

export const useCompositionActions = (
  overrides?: ActionOverrides<Composition>
) => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Composition>(
      {
        ...editActionConfigMap((composition) =>
          setModal(
            <ResourceModal
              title="Edit composition"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateCompositionForm
                handleClose={closeModal}
                composition={composition}
              />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((composition) =>
          setModal(
            <ResourceModal
              title="Delete composition"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteCompositionForm
                handleClose={closeModal}
                composition={composition}
              />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
