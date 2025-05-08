import { Card, LinkOverlay, Text } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Composition } from "../../models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../routes";
import { Favorite } from "../Favorite";
import { CompositionFrom } from "./CompositionFrom";

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
            <NavLink colorPalette={"gray"} to={getCompositionDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description>
          <Text fontSize={"xs"}>
            <CompositionFrom
              partOf={partOf}
              source={source}
              collection={collection}
              emptyText={""}
            />
          </Text>
          <Text>
            Composed by{" "}
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
