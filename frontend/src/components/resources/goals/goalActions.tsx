import { Goal } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const goalActions: ActionMap<Goal> = {
  ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
  ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
};
