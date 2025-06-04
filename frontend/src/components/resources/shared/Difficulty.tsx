import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuStar } from "react-icons/lu";
import { useResourceContext } from "../../../hooks";
import { Arrangement } from "../../../resources/models";

interface Props {
  id?: number;
  oneToFive?: number;
  controlledOnClick?: (value: number) => void;
}

export const Difficulty = ({ oneToFive = 0, id, controlledOnClick }: Props) => {
  const { useUpdate } = useResourceContext<Arrangement>();
  const { updateResource } = useUpdate();

  const difficulty = Math.min(oneToFive, 5);
  const [hoveringOverIndex, setHoveringOverIndex] = useState(-1);

  return (
    <Flex>
      {[...Array(5)].map((_, i) => {
        const isFilledNormally = i < difficulty;
        const isFilledByHover =
          hoveringOverIndex > -1
            ? i <= hoveringOverIndex && !isFilledNormally
            : false;
        const isHiddenByHover =
          difficulty === hoveringOverIndex + 1 &&
          i <= hoveringOverIndex &&
          isFilledNormally
            ? true
            : hoveringOverIndex > -1
            ? i > hoveringOverIndex && isFilledNormally
            : false;
        return (
          <IconButton
            key={i}
            unstyled
            cursor={"pointer"}
            onMouseEnter={() => setHoveringOverIndex(i)}
            onMouseLeave={() => setHoveringOverIndex(-1)}
            color={
              !isFilledNormally && !isFilledByHover
                ? "fg.subtle"
                : isFilledByHover
                ? "fg"
                : isFilledNormally
                ? "orange.focusRing"
                : "rgba(0,0,0,0)"
            }
            fontSize={"inherit"}
            zIndex={"1"}
            onClick={() => {
              const newDifficulty =
                hoveringOverIndex + 1 === difficulty
                  ? 0
                  : hoveringOverIndex + 1;
              if (controlledOnClick) controlledOnClick(newDifficulty);
              else if (id) {
                updateResource({
                  id,
                  payload: {
                    difficulty: newDifficulty,
                  },
                  method: "PATCH",
                });
              }
            }}
          >
            <Icon size={"sm"}>
              <LuStar
                fill={
                  (isFilledNormally || isFilledByHover) && !isHiddenByHover
                    ? "currentColor"
                    : "none"
                }
              />
            </Icon>
          </IconButton>
        );
      })}
    </Flex>
  );
};
