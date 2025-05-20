import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite } from "../shared";
import { Routine } from "../../../models";
import { getRoutineDetailPath } from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";
import { routineActions } from "./routineActions";

interface Props {
  routine: Routine;
}

export const RoutineListGridItemContents = ({ routine }: Props) => {
  const { name, id, isFavorite } = routine;

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
          <ActionMenu
            resource={routine}
            actionMap={routineActions}
            isCardView
          />
        </Flex>
      </Card.Footer>
    </>
  );
};
