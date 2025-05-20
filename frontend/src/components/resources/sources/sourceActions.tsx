import { Source } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const sourceActions: ActionMap<Source> = {
  ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
  ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
};
