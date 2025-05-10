import { Card, LinkOverlay, Span } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { Source } from "../../models";
import { getSourceDetailPath } from "../../routes";
import { Favorite } from "../Favorite";
import { CompositionFrom } from "../compositions";

interface Props {
  source: Source;
}

export const SourceListGridItemContents = ({ source }: Props) => {
  const { name, id, isFavorite, parent } = source;

  return (
    <>
      <Card.Body>
        <Card.Title>
          <LinkOverlay asChild>
            <NavLink to={getSourceDetailPath(id)}>{name}</NavLink>
          </LinkOverlay>
        </Card.Title>
        <Card.Description as={"div"}>
          <Span fontSize={"xs"}>
            <CompositionFrom source={parent} prefixSpanText="from " />
          </Span>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Favorite isFavorite={isFavorite} />
      </Card.Footer>
    </>
  );
};
