import { Flex, Icon, IconButton, RatingGroup } from "@chakra-ui/react";
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
    <RatingGroup.Root
      count={5}
      defaultValue={difficulty > 0 ? difficulty - 1 : 0}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, i) => {
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
            <RatingGroup.Item
              key={i}
              index={i}
              cursor={"pointer"}
              onMouseEnter={() => setHoveringOverIndex(i)}
              onMouseLeave={() => setHoveringOverIndex(-1)}
              onFocus={() => setHoveringOverIndex(i)}
              onBlur={() => setHoveringOverIndex(-1)}
              fontSize={"md"}
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
              onKeyDown={({ key }) => {
                if (![" ", "Enter"].includes(key)) return;

                const newDifficulty = i + 1 === difficulty ? 0 : i + 1;
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
              <RatingGroup.ItemIndicator
                icon={
                  <Icon
                    size={"sm"}
                    color={
                      !isFilledNormally && !isFilledByHover
                        ? "fg.subtle"
                        : isFilledByHover
                        ? "fg"
                        : isFilledNormally
                        ? "orange.focusRing"
                        : "rgba(0,0,0,0)"
                    }
                  >
                    <LuStar
                      fill={
                        (isFilledNormally || isFilledByHover) &&
                        !isHiddenByHover
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Icon>
                }
              />
            </RatingGroup.Item>
          );
        })}
      </RatingGroup.Control>
    </RatingGroup.Root>
  );

  return (
    <RatingGroup.Root>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
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
              <RatingGroup.Item key={i} index={i} asChild>
                <IconButton
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
                        (isFilledNormally || isFilledByHover) &&
                        !isHiddenByHover
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Icon>
                </IconButton>
              </RatingGroup.Item>
            );
          })}
        </Flex>
      </RatingGroup.Control>
    </RatingGroup.Root>
  );
};
