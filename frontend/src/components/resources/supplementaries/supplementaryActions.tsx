import { ReactNode, useState } from "react";
import { Supplementary } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { DeleteSupplementaryForm } from "./DeleteSupplementaryForm";

export const useSupplementaryActions = (
  overrides?: ActionOverrides<Supplementary>
) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Supplementary>(
      {
        ...downloadActionConfigMap(({ name }) =>
          console.log(`Download ${name}`)
        ),
        ...editActionConfigMap((supplementary) =>
          setModal(
            <ResourceModal
              title="Edit supplementary"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateSupplementaryForm
                handleClose={closeModal}
                supplementary={supplementary}
              />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((supplementary) =>
          setModal(
            <ResourceModal
              title="Delete supplementary"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteSupplementaryForm
                handleClose={closeModal}
                supplementary={supplementary}
              />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
