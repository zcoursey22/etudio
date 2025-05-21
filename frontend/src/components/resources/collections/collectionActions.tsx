import { Collection } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const collectionActions: ActionMap<Collection> = {
  ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
  ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
};
