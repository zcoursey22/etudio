import { Card, Flex, Icon, LinkOverlay, Text } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Arrangement } from "../../models";
import { LuDownload, LuExpand } from "react-icons/lu";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../routes";
import { Favorite } from "../Favorite";

interface Props {
  arrangement: Arrangement;
}

export const ArrangementListGridItemContents = ({ arrangement }: Props) => {
  const { name, id, artist, isFavorite, composition } = arrangement;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <Flex gap={"0.5em"} align={"center"}>
            <LinkOverlay asChild>
              <NavLink colorPalette={"gray"} to={getArrangementDetailPath(id)}>
                {name}
              </NavLink>
            </LinkOverlay>
            <Icon>
              <LuExpand />
            </Icon>
          </Flex>
        </Card.Title>
        <Text fontSize={"xs"}>
          <NavLink to={getCompositionDetailPath(composition.id)}>
            {composition.name}
          </NavLink>
          {" by "}
          <NavLink to={getArtistDetailPath(composition.artist.id)}>
            {composition.artist.name}
          </NavLink>
        </Text>
        <Text>
          Arranged by{" "}
          <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
        </Text>
      </Card.Body>
      <Card.Footer>
        <Favorite isFavorite={isFavorite} />
        <Icon>
          <LuDownload />
        </Icon>
      </Card.Footer>
    </>
  );
};
