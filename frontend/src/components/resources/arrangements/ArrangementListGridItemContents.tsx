import {
  Card,
  Flex,
  Group,
  LinkOverlay,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "../../nav";
import {
  ActionConfig,
  ActionMenu,
  Difficulty,
  Favorite,
  PreviewPDF,
  ResourceFrom,
} from "../shared";
import { Arrangement } from "../../../resources/models";
import {
  getArrangementDetailPath,
  getArtistDetailPath,
  getCompositionDetailPath,
} from "../../../routes";
import { getNotationTypeLabel } from "./arrangementUtils";

interface Props {
  arrangement: Arrangement;
  actions: ActionConfig<Arrangement>[];
}

export const ArrangementListGridItemContents = ({
  arrangement,
  actions,
}: Props) => {
  const {
    name,
    id,
    artist,
    isFavorite,
    composition,
    difficulty,
    notationType,
  } = arrangement;

  return (
    <>
      <Card.Body overflow={"hidden"}>
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
            <PreviewPDF pdf={"/sampleScore.pdf"} />
            <Span fontWeight={"normal"} fontSize={"xs"} color={"fg.muted"}>
              {getNotationTypeLabel(notationType)}
            </Span>
          </Flex>
        </Card.Title>
        <Card.Description as={"div"}>
          <Text fontSize={"xs"}>
            arranged by{" "}
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Text>
          <Separator mt={"0.5em"} />
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
        </Card.Description>
      </Card.Body>
      <Card.Footer pt={"1em"}>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Group>
            <Favorite id={id} isFavorite={isFavorite} />
            <Difficulty id={id} oneToFive={difficulty} />
          </Group>
          <ActionMenu resource={arrangement} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
