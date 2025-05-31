import { Icon, IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";
import { useResourceContext } from "../../../hooks";

interface Props {
  isFavorite: boolean;
  id?: number;
  controlledOnClick?: () => void;
  color?: string;
}

export const Favorite = ({
  id,
  isFavorite,
  controlledOnClick,
  color = "red.focusRing",
}: Props) => {
  const { useUpdate } = useResourceContext();
  const { updateResource } = useUpdate();

  return (
    <IconButton
      unstyled
      cursor={"pointer"}
      color={isFavorite ? color : "fg.subtle"}
      fontSize={"inherit"}
      zIndex={"1"}
      onClick={() => {
        if (controlledOnClick) controlledOnClick();
        else if (id)
          updateResource({
            id,
            payload: { isFavorite: !isFavorite },
            method: "PATCH",
          });
      }}
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
