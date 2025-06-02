import { Span } from "@chakra-ui/react";
import { CatalogEntry } from "../../../resources/models";
import { getCatalogTypeLabel } from "./compositionUtils";

export const CompositionCatalogEntriesDisplay = ({
  entries,
  emptySpanText = "",
  prefixSpanText = "",
}: {
  entries?: CatalogEntry[];
  emptySpanText?: string;
  prefixSpanText?: string;
}) => {
  const text = entries
    ?.map(
      (entry) =>
        `${getCatalogTypeLabel(entry.type)} ${entry.number} ${
          entry.subNumber ? ` No. ${entry.subNumber}` : ""
        }`
    )
    .join(", ");

  return <Span>{text ? prefixSpanText + text : emptySpanText}</Span>;
};
