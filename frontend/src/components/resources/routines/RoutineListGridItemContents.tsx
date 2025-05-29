import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite } from "../shared";
import { Routine } from "../../../resources/models";
import { getRoutineDetailPath } from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";
import { useRoutineActions } from "./routineActions";

interface Props {
  routine: Routine;
}

export const RoutineListGridItemContents = ({ routine }: Props) => {
  const { name, id, isFavorite } = routine;
  const actions = useRoutineActions();

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getRoutineDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite isFavorite={isFavorite} />
          <ActionMenu resource={routine} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
