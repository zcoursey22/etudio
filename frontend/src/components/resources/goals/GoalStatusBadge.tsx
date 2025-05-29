import { Badge, ColorPalette, Icon } from "@chakra-ui/react";
import { GoalStatus } from "../../../resources/models";
import { getStatusLabel } from "./goalUtils";
import {
  LuCircleArrowRight,
  LuCircleCheck,
  LuCircleEllipsis,
  LuCirclePause,
} from "react-icons/lu";
import { IconType } from "react-icons";

interface Props {
  status: GoalStatus;
}

export const GoalStatusBadge = ({ status }: Props) => {
  let colorPalette: ColorPalette = "gray";
  let icon: IconType = LuCircleEllipsis;
  switch (status) {
    case GoalStatus.IN_PROGRESS:
      colorPalette = "blue";
      icon = LuCircleArrowRight;
      break;
    case GoalStatus.PAUSED:
      colorPalette = "orange";
      icon = LuCirclePause;
      break;
    case GoalStatus.DONE:
      colorPalette = "green";
      icon = LuCircleCheck;
      break;
  }
  return (
    <Badge variant={"subtle"} colorPalette={colorPalette}>
      <Icon as={icon} />
      {getStatusLabel(status).toUpperCase()}
    </Badge>
  );
};
