import { Composition } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const compositionActions: ActionMap<Composition> = {
  ...renameActionConfigMap((c) => console.log(`Rename ${c.name}`)),
  ...deleteActionConfigMap((c) => console.log(`Delete ${c.name}`)),
};
