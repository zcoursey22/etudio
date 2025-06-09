import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { Favorite, ActionMenu, ActionConfig } from "../shared";
import { Routine } from "../../../resources/models";
import { getRoutineDetailPath } from "../../../routes";

interface Props {
  routine: Routine;
  actions: ActionConfig<Routine>[];
}

export const RoutineListGridItemContents = ({ routine, actions }: Props) => {
  const { name, id, isFavorite } = routine;

  return (
    <>
      <Card.Body overflow={"hidden"}>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getRoutineDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
      </Card.Body>
      <Card.Footer pt={"1em"}>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={routine} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
