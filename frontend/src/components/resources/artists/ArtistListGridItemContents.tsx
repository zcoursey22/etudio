import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { ActionConfig, Favorite, ActionMenu } from "../shared";
import { Artist } from "../../../resources/models";
import { getArtistDetailPath } from "../../../routes";

interface Props {
  artist: Artist;
  actions: ActionConfig<Artist>[];
}

export const ArtistListGridItemContents = ({ artist, actions }: Props) => {
  const { name, id, isFavorite } = artist;

  return (
    <>
      <Card.Body overflow={"hidden"}>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getArtistDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
      </Card.Body>
      <Card.Footer pt={"1em"}>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={artist} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
