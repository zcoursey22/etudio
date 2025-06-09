import { Card, Flex, LinkOverlay, Separator, Text } from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { ActionConfig, Favorite, ActionMenu } from "../shared";
import { Goal } from "../../../resources/models";
import { getGoalDetailPath } from "../../../routes";
import { GoalStatusBadge } from "./GoalStatusBadge";
import { getFormattedDescription } from "../../../utils";

interface Props {
  goal: Goal;
  actions: ActionConfig<Goal>[];
}

export const GoalListGridItemContents = ({ goal, actions }: Props) => {
  const { name, id, isFavorite, description, status } = goal;

  return (
    <>
      <Card.Body overflow={"hidden"}>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getGoalDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description as={"div"}>
          <GoalStatusBadge id={id} status={status} />
          {description && (
            <>
              <Separator mt={"0.5em"} />
              <Text wordBreak={"break-all"}>
                {getFormattedDescription(description)}
              </Text>
            </>
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer pt={"1em"}>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={goal} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
