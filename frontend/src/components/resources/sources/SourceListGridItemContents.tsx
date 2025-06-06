import { Card, Flex, LinkOverlay, Separator, Span } from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { Source } from "../../../resources/models";
import { getArtistDetailPath, getSourceDetailPath } from "../../../routes";
import { Favorite, ResourceFrom, ActionMenu, ActionConfig } from "../shared";
import { ROUTE_SEGMENTS } from "../../../constants";

interface Props {
  source: Source;
  actions: ActionConfig<Source>[];
}

export const SourceListGridItemContents = ({ source, actions }: Props) => {
  const { name, id, isFavorite, parent, artist, type } = source;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getSourceDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            {artist ? (
              <>
                {"by "}
                <NavLink to={getArtistDetailPath(artist.id)}>
                  {artist.name}
                </NavLink>
              </>
            ) : (
              <ResourceFrom
                source={parent}
                sourceSubresourceRouteSegment={ROUTE_SEGMENTS.SOURCES}
              />
            )}
          </Span>
          <Separator mt={"0.5em"} />
          <Span fontSize={"sm"} color={"fg.muted"} fontWeight={"normal"}>
            {type}
          </Span>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={source} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
