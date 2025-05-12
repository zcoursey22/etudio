import { Icon, IconButton } from "@chakra-ui/react";
import { LuStar } from "react-icons/lu";

interface Props {
  isFavorite?: boolean;
}

export const Favorite = ({ isFavorite }: Props) => {
  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={isFavorite ? "orange.focusRing" : "fg"}
      fontSize={"inherit"}
      zIndex={"1"}
    >
      <Icon size={"sm"} _hover={{ fill: isFavorite ? "none" : "currentcolor" }}>
        <LuStar fill={isFavorite ? "currentcolor" : "none"} />
      </Icon>
    </IconButton>
  );
};
