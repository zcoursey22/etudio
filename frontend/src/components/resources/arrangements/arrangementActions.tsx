import { useState } from "react";
import { useDeleteArrangement } from "../../../hooks";
import { Arrangement } from "../../../resources/models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  downloadActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useArrangementActions = (
  overrides?: ActionOverrides<Arrangement>
) => {
  const { deleteResource } = useDeleteArrangement();
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
        ...deleteActionConfigMap(async ({ id }) => deleteResource(id)),
      },
      overrides
    ),
  };
};
