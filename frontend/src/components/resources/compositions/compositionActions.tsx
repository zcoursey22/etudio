import { useDeleteComposition } from "../../../hooks";
import { Composition } from "../../../models";
import {
  ActionOverrides,
  deleteActionConfigMap,
  renameActionConfigMap,
  resolveActions,
} from "../shared";

export const useCompositionActions = (
  overrides?: ActionOverrides<Composition>
) => {
  const { deleteResource } = useDeleteComposition();

  return resolveActions<Composition>(
    {
      ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
