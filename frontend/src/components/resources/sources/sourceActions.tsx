import { ReactNode, useState } from "react";
import { Source } from "../../../resources/models";
import {
  ActionOverrides,
  createActionConfigMap,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { DeleteSourceForm } from "./DeleteSourceForm";

export const useSourceActions = (overrides?: ActionOverrides<Source>) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Source>(
      {
        ...createActionConfigMap(({ id }) =>
          setModal(
            <ResourceModal
              title="Create source"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateSourceForm handleClose={closeModal} parentId={id} />
            </ResourceModal>
          )
        ),
        ...editActionConfigMap((source) =>
          setModal(
            <ResourceModal
              title="Edit source"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateSourceForm handleClose={closeModal} source={source} />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((source) =>
          setModal(
            <ResourceModal
              title="Delete source"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteSourceForm handleClose={closeModal} source={source} />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
