import { Card, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Routine } from "../../models";
import { getRoutineDetailPath } from "../../routes";
import { Favorite } from "../resources/shared";

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
        <Favorite isFavorite={isFavorite} />
      </Card.Footer>
    </>
  );
};
