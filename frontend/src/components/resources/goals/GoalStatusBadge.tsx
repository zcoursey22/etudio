import { Badge, ColorPalette } from "@chakra-ui/react";
import { GoalStatus } from "../../../models";
import { getStatusLabel } from "./goalUtils";

interface Props {
  status: GoalStatus;
}

export const GoalStatusBadge = ({ status }: Props) => {
  let colorPalette: ColorPalette = "gray";
  switch (status) {
    case GoalStatus.IN_PROGRESS:
      colorPalette = "blue";
      break;
    case GoalStatus.PAUSED:
      colorPalette = "orange";
      break;
    case GoalStatus.DONE:
      colorPalette = "green";
      break;
  }
  return (
    <Badge variant={"subtle"} colorPalette={colorPalette}>
      {getStatusLabel(status).toUpperCase()}
    </Badge>
  );
};
