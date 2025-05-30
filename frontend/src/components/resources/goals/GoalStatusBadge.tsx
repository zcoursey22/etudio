import { Button, ColorPalette, Icon, Menu, Portal } from "@chakra-ui/react";
import { Goal, GoalStatus } from "../../../resources/models";
import { getStatusLabel } from "./goalUtils";
import {
  LuCircleArrowRight,
  LuCircleCheck,
  LuCircleEllipsis,
  LuCirclePause,
} from "react-icons/lu";
import { IconType } from "react-icons";
import { useResourceContext } from "../../../hooks";

interface Props {
  status: GoalStatus;
  id?: number;
}

export const GoalStatusBadge = ({ id, status }: Props) => {
  const { useUpdate } = useResourceContext<Goal>();
  const { updateResource } = useUpdate();

  let colorPalette: ColorPalette = "gray";
  let icon: IconType = LuCircleEllipsis;
  let options: GoalStatus[] = [GoalStatus.IN_PROGRESS];
  switch (status) {
    case GoalStatus.IN_PROGRESS:
      colorPalette = "blue";
      icon = LuCircleArrowRight;
      options = [GoalStatus.PAUSED, GoalStatus.DONE];
      break;
    case GoalStatus.PAUSED:
      colorPalette = "orange";
      icon = LuCirclePause;
      options = [GoalStatus.IN_PROGRESS];
      break;
    case GoalStatus.DONE:
      colorPalette = "green";
      icon = LuCircleCheck;
      options = [GoalStatus.IN_PROGRESS];
      break;
  }
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          colorPalette={colorPalette}
          variant={"subtle"}
          size={"2xs"}
          zIndex={"1"}
          borderRadius={"full"}
        >
          <Icon as={icon} />
          {getStatusLabel(status).toUpperCase()}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Arrow />
            {options.map((option) => (
              <Menu.Item
                key={option}
                value={option}
                onClick={() => {
                  if (id) updateResource({ id, payload: { status: option } });
                }}
              >
                {getStatusLabel(option)}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
