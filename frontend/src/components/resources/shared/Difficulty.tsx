import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuStar } from "react-icons/lu";

interface Props {
  oneToFive?: number;
}

export const Difficulty = ({ oneToFive = 0 }: Props) => {
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
