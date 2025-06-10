import { ReactNode, useState } from "react";
import { Artist } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
  ResourceModal,
} from "../shared";
import { DeleteArtistForm } from "./DeleteArtistForm";
import { CreateArtistForm } from "./CreateArtistForm";

export const useArtistActions = (overrides?: ActionOverrides<Artist>) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const closeModal = () => setModal(null);

  return {
    modal,
    actions: resolveActions<Artist>(
      {
        ...editActionConfigMap((artist) =>
          setModal(
            <ResourceModal
              title="Edit artist"
              isOpen={true}
              handleClose={closeModal}
            >
              <CreateArtistForm handleClose={closeModal} artist={artist} />
            </ResourceModal>
          )
        ),
        ...deleteActionConfigMap((artist) =>
          setModal(
            <ResourceModal
              title="Delete artist"
              isOpen={true}
              handleClose={closeModal}
            >
              <DeleteArtistForm handleClose={closeModal} artist={artist} />
            </ResourceModal>
          )
        ),
      },
      overrides
    ),
  };
};
