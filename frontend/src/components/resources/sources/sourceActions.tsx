import { useDeleteSource } from "../../../hooks";
import { Source } from "../../../resources/models";
import {
  ActionOverrides,
  createActionConfigMap,
  deleteActionConfigMap,
  editActionConfigMap,
  resolveActions,
} from "../shared";

export const useSourceActions = (overrides?: ActionOverrides<Source>) => {
  const { deleteResource } = useDeleteSource();

  return resolveActions<Source>(
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
