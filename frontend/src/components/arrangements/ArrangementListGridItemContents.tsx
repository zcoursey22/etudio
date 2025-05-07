import { Card, Flex, Icon, LinkOverlay, Text } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Arrangement } from "../../models";
import { LuDownload, LuExpand } from "react-icons/lu";
import {
  getArrangementDetailPath,
  getArrangerDetailPath,
  getComposerDetailPath,
  getCompositionDetailPath,
} from "../../routes";
import { Favorite } from "../Favorite";

interface Props {
  arrangement: Arrangement;
}

export const ArrangementListGridItemContents = ({ arrangement }: Props) => {
  const { name, id, arranger, isFavorite, composition } = arrangement;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <Flex gap={"0.5em"} align={"center"}>
            <LinkOverlay asChild>
              <NavLink colorPalette={"gray"} to={getArrangementDetailPath(id)}>
                {name}
              </NavLink>
            </LinkOverlay>
            <Icon>
              <LuExpand />
            </Icon>
          </Flex>
        </Card.Title>
        <Card.Description>
          <Text fontSize={"xs"}>
            <NavLink to={getCompositionDetailPath(composition.id)}>
              {composition.name}
            </NavLink>
            {" by "}
            <NavLink to={getComposerDetailPath(composition.id)}>
              {composition.composer.name}
            </NavLink>
          </Text>
          <Text>
            Arranged by{" "}
            <NavLink to={getArrangerDetailPath(arranger.id)}>
              {arranger.name}
            </NavLink>
          </Text>
        </Card.Description>
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
