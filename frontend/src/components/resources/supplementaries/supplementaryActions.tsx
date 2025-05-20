import { Supplementary } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  downloadActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const supplementaryActions: ActionMap<Supplementary> = {
  ...renameActionConfigMap((s) => console.log(`Rename ${s.name}`)),
  ...downloadActionConfigMap((s) => console.log(`Download ${s.name}`)),
  ...deleteActionConfigMap((s) => console.log(`Delete ${s.name}`)),
};
