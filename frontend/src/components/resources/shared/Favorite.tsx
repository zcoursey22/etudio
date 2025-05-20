import { Icon, IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

interface Props {
  isFavorite?: boolean;
}

export const Favorite = ({ isFavorite }: Props) => {
  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={isFavorite ? "red.focusRing" : "fg.subtle"}
      fontSize={"inherit"}
      zIndex={"1"}
    >
      <Icon
        size={"sm"}
        _hover={{
          fill: isFavorite ? "none" : "fg",
          color: isFavorite ? "none" : "fg",
        }}
      >
        <LuHeart fill={isFavorite ? "currentcolor" : "none"} />
      </Icon>
    </IconButton>
  );
};
