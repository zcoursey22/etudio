import { useDeleteComposition } from "../../../hooks";
import { Composition } from "../../../models";
import {
  ActionOverrides,
  createActionConfigMap,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useCompositionActions = (
  overrides?: ActionOverrides<Composition>
) => {
  const { deleteResource } = useDeleteComposition();

  return resolveActions<Composition>(
    {
      ...createActionConfigMap(({ name }) =>
        console.log(
          `This should open a menu to create one of the subresources for ${name}`
        )
      ),
      ...editActionConfigMap(({ name }) => console.log(`Edit ${name}`)),
      ...deleteActionConfigMap(({ id }) => deleteResource(id)),
    },
    overrides
  );
};
