import { Card, Flex, LinkOverlay, Separator, Text } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite } from "../shared";
import { Goal } from "../../../models";
import { getGoalDetailPath } from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";
import { useGoalActions } from "./goalActions";

interface Props {
  goal: Goal;
}

export const GoalListGridItemContents = ({ goal }: Props) => {
  const { name, id, isFavorite, description } = goal;
  const actions = useGoalActions();

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getGoalDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description as={"div"}>
          {description && (
            <>
              <Separator mt={"0.5em"} />
              <Text>{description}</Text>
            </>
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite isFavorite={isFavorite} />
          <ActionMenu resource={goal} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
