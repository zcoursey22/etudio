import { Arrangement } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  downloadActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const arrangementActions: ActionMap<Arrangement> = {
  ...renameActionConfigMap((a) => console.log(`Rename ${a.name}`)),
  ...downloadActionConfigMap((a) => console.log(`Download ${a.name}`)),
  ...deleteActionConfigMap((a) => console.log(`Delete ${a.name}`)),
};
