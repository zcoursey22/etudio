import { NotationType } from "../../../resources/models";
import { capitalize } from "../../../utils";

const notationTypeMap: Record<NotationType, string> = {
  [NotationType.SHEET]: "sheet",
  [NotationType.TAB]: "tab",
  [NotationType.SHEET_TAB]: "sheet + tab",
};

export const getNotationTypeLabel = (
  type: NotationType,
  capitalized?: boolean
) => {
  return capitalized
    ? capitalize(notationTypeMap[type])
    : notationTypeMap[type];
};
