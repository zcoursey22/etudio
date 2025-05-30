import {
  Card,
  Flex,
  LinkOverlay,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { ActionConfig, Favorite, ResourceFrom } from "../shared";
import { Composition } from "../../../resources/models";
import { getArtistDetailPath, getCompositionDetailPath } from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";

interface Props {
  composition: Composition;
  actions: ActionConfig<Composition>[];
}

export const CompositionListGridItemContents = ({
  composition,
  actions,
}: Props) => {
  const { name, id, artist, isFavorite } = composition;

  return (
    <>
      <Card.Body>
        <Card.Title>
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
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <ResourceFrom {...composition} />
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
