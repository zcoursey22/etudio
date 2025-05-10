import { Card, LinkOverlay, Separator, Span, Text } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Composition } from "../../models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../routes";
import { Favorite, ResourceFrom } from "../resources/shared";

interface Props {
  composition: Composition;
}

export const CompositionListGridItemContents = ({ composition }: Props) => {
  const { name, id, artist, isFavorite, partOf, source, collection } =
    composition;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink
              // color={"blue.900"}
              // _dark={{ color: "blue.100" }}
              // color={"fg"}
              to={getCompositionDetailPath(id)}
            >
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <ResourceFrom
              partOf={partOf}
              source={source}
              collection={collection}
              prefixSpanText="from "
            />
          </Span>
          <Separator mt={"0.5em"} />
          <Text>
            by{" "}
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Text>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Favorite isFavorite={isFavorite} />
      </Card.Footer>
    </>
  );
};
