import { Group, Icon, Text } from "@chakra-ui/react";
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
  emptyText?: string;
}

export const CompositionFrom = ({
  partOf,
  source,
  collection,
  emptyText = "-",
}: Props) => {
  const config: { label: string; url?: string; icon: ReactNode } = {
    label: emptyText,
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
    return label;
  }
  return (
    <NavLink to={url}>
      <Group gap={"0.5em"}>
        {icon && <Icon>{icon}</Icon>}
        <Text>{label}</Text>
      </Group>
    </NavLink>
  );
};
