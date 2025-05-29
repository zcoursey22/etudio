import {
  Card,
  Flex,
  Group,
  LinkOverlay,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Difficulty, Favorite, PreviewPDF, ResourceFrom } from "../shared";
import { Arrangement } from "../../../resources/models";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";
import { useArrangementActions } from "./arrangementActions";

interface Props {
  arrangement: Arrangement;
}

export const ArrangementListGridItemContents = ({ arrangement }: Props) => {
  const { name, id, artist, isFavorite, composition, difficulty } = arrangement;
  const actions = useArrangementActions();

  return (
    <>
      <Card.Body>
        <Card.Title>
          <Flex gap={"0.5em"} align={"center"}>
            <LinkOverlay asChild>
              <NavLink
                colorPalette={"gray"}
                // color={"blue.900"}
                // _dark={{ color: "blue.100" }}
                to={getArrangementDetailPath(id)}
              >
                {name}
              </NavLink>
            </LinkOverlay>
            <PreviewPDF pdf={null} />
          </Flex>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
            <ResourceFrom {...composition} prefixPadding="1" />
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
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Group>
            <Favorite isFavorite={isFavorite} />
            <Difficulty oneToFive={difficulty} />
          </Group>
          <ActionMenu resource={arrangement} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
