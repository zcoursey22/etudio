import {
  Card,
  Flex,
  Icon,
  LinkOverlay,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite, ResourceFrom } from "../shared";
import { Arrangement } from "../../../models";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../../routes";
import { LuDownload, LuExpand } from "react-icons/lu";

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
              <NavLink
                // color={"blue.900"}
                // _dark={{ color: "blue.100" }}
                // color={"fg"}
                to={getArrangementDetailPath(id)}
              >
                {name}
              </NavLink>
            </LinkOverlay>
            <Icon>
              <LuExpand />
            </Icon>
          </Flex>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
            {ResourceFrom({
              ...composition,
              prefixSpanText: " from ",
            })}
          </Span>
          <Text fontSize={"2xs"}>
            composed by{" "}
            <NavLink to={getArtistDetailPath(composition.artist.id)}>
              {composition.artist.name}
            </NavLink>
          </Text>
          <Separator mt={"0.5em"} />
          <Text>
            arranged by{" "}
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Text>
        </Card.Description>
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
