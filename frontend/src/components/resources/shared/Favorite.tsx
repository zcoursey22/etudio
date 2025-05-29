import { Icon, IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

interface Props {
  toggleHandler?: () => void;
  isFavorite?: boolean;
}

export const Favorite = ({ isFavorite, toggleHandler }: Props) => {
  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={isFavorite ? "red.focusRing" : "fg.subtle"}
      fontSize={"inherit"}
      zIndex={"1"}
      onClick={() => toggleHandler && toggleHandler()}
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
