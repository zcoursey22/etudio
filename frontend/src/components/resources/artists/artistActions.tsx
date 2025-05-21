import { Artist } from "../../../models";
import {
  ActionMap,
  deleteActionConfigMap,
  renameActionConfigMap,
} from "../shared";

export const artistActions: ActionMap<Artist> = {
  ...renameActionConfigMap(({ name }) => console.log(`Rename ${name}`)),
  ...deleteActionConfigMap(({ name }) => console.log(`Delete ${name}`)),
};
