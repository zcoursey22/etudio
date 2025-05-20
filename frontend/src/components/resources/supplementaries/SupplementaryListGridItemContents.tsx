import { Card, Flex, Icon, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../../nav/NavLink";
import { Favorite, PreviewPDF } from "../shared";
import { Supplementary } from "../../../models";
import { LuDownload } from "react-icons/lu";
import { getSupplementaryDetailPath } from "../../../routes";

interface Props {
  supplementary: Supplementary;
}

export const SupplementaryListGridItemContents = ({ supplementary }: Props) => {
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
            <PreviewPDF pdf={null} />
          </Flex>
        </Card.Title>
      </Card.Body>
      <Card.Footer>
        <Favorite isFavorite={isFavorite} />
        <Icon>
          <LuDownload />
        </Icon>
      </Card.Footer>
    </>
  );
};
