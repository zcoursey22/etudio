import { Icon, IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";
import { useResourceContext } from "../../../hooks";

interface Props {
  id: number;
  isFavorite: boolean;
}

export const Favorite = ({ id, isFavorite }: Props) => {
  const { useUpdate } = useResourceContext();
  const { updateResource } = useUpdate();

  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={isFavorite ? "red.focusRing" : "fg.subtle"}
      fontSize={"inherit"}
      zIndex={"1"}
      onClick={() =>
        updateResource({ id, payload: { isFavorite: !isFavorite } })
      }
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
