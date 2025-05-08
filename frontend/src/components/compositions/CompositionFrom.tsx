import { Group, Icon, Span, Text } from "@chakra-ui/react";
import { Collection, Composition, Source } from "../../models";
import { NavLink } from "../nav/NavLink";
import {
  getCollectionDetailPath,
  getCompositionDetailPath,
  getSourceDetailPath,
} from "../../routes";
import { ReactNode } from "react";

interface Props {
  partOf?: Composition;
  source?: Source;
  collection?: Collection;
  emptySpanText?: string;
  prefixSpanText?: string;
  spanColor?: string;
}

export const CompositionFrom = ({
  partOf,
  source,
  collection,
  prefixSpanText,
  emptySpanText,
  spanColor = "currentcolor",
}: Props) => {
  const config: { label: string; url?: string; icon: ReactNode } = {
    label: "",
    url: undefined,
    icon: undefined,
  };
  if (partOf) {
    config.label = partOf.name;
    config.url = getCompositionDetailPath(partOf.id);
  } else if (source) {
    config.label = source.name;
    config.url = getSourceDetailPath(source.id);
  } else if (collection) {
    config.label = collection.name;
    config.url = getCollectionDetailPath(collection.id);
  }

  const { label, url, icon } = config;
  if (!url) {
    return emptySpanText && <Span color={spanColor}>{emptySpanText}</Span>;
  }
  return (
    <>
      {prefixSpanText && <Span color={spanColor}>{prefixSpanText}</Span>}
      <NavLink to={url}>
        <Group gap={"0.5em"}>
          {icon && <Icon>{icon}</Icon>}
          <Text>{label}</Text>
        </Group>
      </NavLink>
    </>
  );
};
