import { Flex, Icon, Span } from "@chakra-ui/react";
import {
  Collection,
  Composition,
  Source,
  SourceType,
} from "../../../resources/models";
import { NavLink } from "../../nav";
import {
  getCollectionDetailPath,
  getCompositionDetailPath,
  getSourceDetailPath,
} from "../../../routes";
import { ReactNode } from "react";
import {
  LuClapperboard,
  LuDisc3,
  LuDrama,
  LuFolder,
  LuGamepad2,
  LuMusic,
  LuTv,
} from "react-icons/lu";
import { ROUTE_SEGMENTS } from "../../../constants";

interface Props {
  partOf?: Composition;
  source?: Source;
  collection?: Collection;
  emptySpanText?: string;
  prefixSpanText?: string;
  spanColor?: string;
  showIcon?: boolean;
  prefixPadding?: string;
  sourceSubresourceRouteSegment?: string;
}

const sourceIconMap: { [type in SourceType]: ReactNode } = {
  [SourceType.FILM]: <LuClapperboard />,
  [SourceType.GAME]: <LuGamepad2 />,
  [SourceType.TELEVISION]: <LuTv />,
  [SourceType.THEATRE]: <LuDrama />,
  [SourceType.OTHER]: <LuFolder />,
};

export const ResourceFrom = ({
  partOf,
  source,
  collection,
  prefixSpanText = "from",
  emptySpanText,
  spanColor = "currentcolor",
  showIcon = true,
  prefixPadding,
  sourceSubresourceRouteSegment,
}: Props) => {
  const config: { label: string; url?: string; icon: ReactNode } = {
    label: "",
    url: undefined,
    icon: undefined,
  };
  if (partOf) {
    config.label = partOf.name;
    config.url = getCompositionDetailPath(
      partOf.id,
      ROUTE_SEGMENTS.COMPOSITIONS
    );
    config.icon = <LuMusic />;
  } else if (source) {
    config.label = source.name;
    config.url = getSourceDetailPath(source.id, sourceSubresourceRouteSegment);
    config.icon = sourceIconMap[source.type];
  } else if (collection) {
    config.label = collection.name;
    config.url = getCollectionDetailPath(collection.id);
    config.icon = <LuDisc3 />;
  }

  const { label, url, icon } = config;
  if (!url) {
    return emptySpanText && <Span color={spanColor}>{emptySpanText}</Span>;
  }
  return (
    <Flex ml={prefixPadding} display={"inline-flex"} align={"center"} gap={"1"}>
      {prefixSpanText && <Span color={spanColor}>{prefixSpanText}</Span>}
      <NavLink to={url}>
        <Flex display={"inline-flex"} align={"center"} gap={"1"}>
          {icon && showIcon && <Icon size={"inherit"}>{icon}</Icon>}
          <Span>{label}</Span>
        </Flex>
      </NavLink>
    </Flex>
  );
};
