import { Card, Flex, LinkOverlay, Span } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Source } from "../../../models";
import { getSourceDetailPath } from "../../../routes";
import { Favorite, ResourceFrom } from "../shared";
import { ActionMenu } from "../shared/ActionMenu";
import { useSourceActions } from "./sourceActions";

interface Props {
  source: Source;
}

export const SourceListGridItemContents = ({ source }: Props) => {
  const { name, id, isFavorite, parent } = source;
  const actions = useSourceActions();

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
            <ResourceFrom source={parent} prefixPadding="1" />
          </Span>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite isFavorite={isFavorite} />
          <ActionMenu resource={source} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
