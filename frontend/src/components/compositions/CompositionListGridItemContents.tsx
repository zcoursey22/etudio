import { Card, LinkOverlay } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Composition } from "../../models";
import { getComposerDetailPath, getCompositionDetailPath } from "../../routes";
import { Favorite } from "../Favorite";

interface Props {
  composition: Composition;
}

export const CompositionListGridItemContents = ({ composition }: Props) => {
  const { name, id, composer, isFavorite } = composition;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink colorPalette={"gray"} to={getCompositionDetailPath(id)}>
              {name}
            </NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description>
          Composed by{" "}
          <NavLink to={getComposerDetailPath(id)}>{composer.name}</NavLink>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Favorite isFavorite={isFavorite} />
      </Card.Footer>
    </>
  );
};
