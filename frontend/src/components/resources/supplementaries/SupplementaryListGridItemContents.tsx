import { Card, Flex, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite, PreviewPDF } from "../shared";
import { Supplementary } from "../../../models";
import { getSupplementaryDetailPath } from "../../../routes";
import { ActionMenu } from "../shared/ActionMenu";
import { useSupplementaryActions } from "./supplementaryActions";

interface Props {
  supplementary: Supplementary;
}

export const SupplementaryListGridItemContents = ({ supplementary }: Props) => {
  const { name, id, isFavorite } = supplementary;
  const actions = useSupplementaryActions();

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
            <PreviewPDF pdf={null} />
          </Flex>
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Favorite isFavorite={isFavorite} />
          <ActionMenu resource={supplementary} actions={actions} isCardView />
        </Flex>
      </Card.Footer>
    </>
  );
};
