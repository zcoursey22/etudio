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
      color={isFavorite ? "orange.400" : "fg"}
      fontSize={"xs"}
      zIndex={"1"}
    >
      <Icon size={"sm"} _hover={{ fill: isFavorite ? "none" : "fg" }}>
        <LuStar fill={isFavorite ? "currentcolor" : "none"} />
      </Icon>
    </IconButton>
  );
};
