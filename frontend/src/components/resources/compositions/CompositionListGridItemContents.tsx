import {
  Card,
  Flex,
  LinkOverlay,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { ActionConfig, Favorite, ActionMenu, ResourceFrom } from "../shared";
import { Composition } from "../../../resources/models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../../routes";
import { CompositionCatalogEntriesDisplay } from "./CompositionCatalogEntriesDisplay";

interface Props {
  composition: Composition;
  actions: ActionConfig<Composition>[];
}

export const CompositionListGridItemContents = ({
  composition,
  actions,
}: Props) => {
  const { name, id, artist, isFavorite, type, catalogEntries } = composition;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <Flex align={"flex-end"} gap={"0.5em"}>
            <LinkOverlay asChild>
              <NavLink
                colorPalette={"gray"}
                // color={"blue.900"}
                // _dark={{ color: "blue.100" }}
                to={getCompositionDetailPath(id)}
              >
                {name}
              </NavLink>
            </LinkOverlay>
            {!!catalogEntries?.length && (
              <Span fontWeight={"normal"} color={"fg.muted"} fontSize={"xs"}>
                <CompositionCatalogEntriesDisplay entries={catalogEntries} />
              </Span>
            )}
          </Flex>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <Flex align={"center"} gap={"1"}>
              {type}
              <ResourceFrom {...composition} />
            </Flex>
          </Span>
          <Separator mt={"0.5em"} />
          <Text>
            by{" "}
            <NavLink to={getArtistDetailPath(artist.id)}>{artist.name}</NavLink>
          </Text>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={composition} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
