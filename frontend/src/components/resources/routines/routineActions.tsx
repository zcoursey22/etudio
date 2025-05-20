import { Routine } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const routineActions: ActionMap<Routine> = {
  ...renameActionConfigMap((r) => console.log(`Rename ${r.name}`)),
  ...deleteActionConfigMap((r) => console.log(`Delete ${r.name}`)),
};
