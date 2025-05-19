import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuStar } from "react-icons/lu";

interface Props {
  oneToFive?: number;
}

export const Difficulty = ({ oneToFive = 0 }: Props) => {
  const [hoveringOverIndex, setHoveringOverIndex] = useState(-1);

  return (
    <Flex>
      {[...Array(5)].map((_, i) => {
        const isFilledNormally = i < oneToFive;
        const isFilledByHover =
          hoveringOverIndex > -1
            ? i <= hoveringOverIndex && !isFilledNormally
            : false;
        const isHiddenByHover =
          hoveringOverIndex > -1
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
                  (isFilledNormally && !isHiddenByHover) || isFilledByHover
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
