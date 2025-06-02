import { Flex, Icon, Span } from "@chakra-ui/react";
import {
  Composition,
  CompositionType,
  Source,
  SourceType,
} from "../../../resources/models";
import { NavLink } from "../../nav";
import { getCompositionDetailPath, getSourceDetailPath } from "../../../routes";
import { ReactNode } from "react";
import {
  LuClapperboard,
  LuDisc3,
  LuDrama,
  LuGamepad2,
  LuMusic,
  LuTv,
} from "react-icons/lu";
import { ROUTE_SEGMENTS } from "../../../constants";

interface Props {
  partOf?: Composition;
  source?: Source;
  emptySpanText?: string;
  prefixSpanText?: string;
  spanColor?: string;
  showIcon?: boolean;
  prefixPadding?: string;
  sourceSubresourceRouteSegment?: string;
}

const compositionIconMap: { [type in CompositionType]: ReactNode } = {
  [CompositionType.OPERA]: <LuDrama />,
  [CompositionType.MUSICAL]: <LuDrama />,
  [CompositionType.BALLET]: <LuDrama />,
  [CompositionType.WORK]: <LuMusic />,
  [CompositionType.SYMPHONY]: <LuMusic />,
  [CompositionType.SUITE]: <LuMusic />,
  [CompositionType.SONATA]: <LuMusic />,
  [CompositionType.CONCERTO]: <LuMusic />,
  [CompositionType.MOVEMENT]: <LuMusic />,
  [CompositionType.SONG]: <LuMusic />,
};

const sourceIconMap: { [type in SourceType]: ReactNode } = {
  [SourceType.ALBUM]: <LuDisc3 />,
  [SourceType.FILM]: <LuClapperboard />,
  [SourceType.GAME]: <LuGamepad2 />,
  [SourceType.TELEVISION]: <LuTv />,
};

export const ResourceFrom = ({
  partOf,
  source,
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
    config.icon = partOf.type ? compositionIconMap[partOf.type] : <LuMusic />;
  } else if (source) {
    config.label = source.name;
    config.url = getSourceDetailPath(source.id, sourceSubresourceRouteSegment);
    config.icon = sourceIconMap[source.type];
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
