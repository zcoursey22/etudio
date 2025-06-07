import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav";
import { Favorite, PreviewPDF, ActionMenu, ActionConfig } from "../shared";
import { Supplementary } from "../../../resources/models";
import { getSupplementaryDetailPath } from "../../../routes";

interface Props {
  supplementary: Supplementary;
  actions: ActionConfig<Supplementary>[];
}

export const SupplementaryListGridItemContents = ({
  supplementary,
  actions,
}: Props) => {
  const { name, id, isFavorite } = supplementary;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <Flex gap={"0.5em"} align={"center"}>
            <LinkOverlay asChild>
              <NavLink
                colorPalette={"gray"}
                to={getSupplementaryDetailPath(id)}
              >
                {name}
              </NavLink>
            </LinkOverlay>
            <PreviewPDF pdf={"/sampleScore.pdf"} />
          </Flex>
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite id={id} isFavorite={isFavorite} />
          <ActionMenu resource={supplementary} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
