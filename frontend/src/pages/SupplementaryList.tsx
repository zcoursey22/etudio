import { Card, LinkOverlay, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Supplementary } from "../models";
import { NavLink } from "../components/nav/NavLink";
import { getSupplementaryDetailPath } from "../routes";
import { formatDate } from "../utils";

const supplementaries: Supplementary[] = [
  {
    id: "1",
    created: new Date(),
    lastModified: new Date(),
    name: "instruction-book.pdf",
  },
  {
    id: "2",
    created: new Date(),
    lastModified: new Date(),
    isFavorite: true,
    name: "recording-reference.wav",
  },
];
const loading = false;
const error = undefined;

export const SupplementaryList = () => {
  return (
    <ListViewContainer
      title="Supplementaries"
      items={supplementaries}
      loading={loading}
      error={error}
      renderHeaderRowContents={() => (
        <>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
        </>
      )}
      renderRowContents={({ id, lastModified, name }) => (
        <>
          <Table.Cell>
            <NavLink to={getSupplementaryDetailPath(id)}>{name}</NavLink>
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
        </>
      )}
      renderGridItemContents={({ id, name }) => (
        <Card.Body>
          <Card.Title>
            <LinkOverlay asChild>
              <NavLink
                colorPalette={"gray"}
                to={getSupplementaryDetailPath(id)}
              >
                {name}
              </NavLink>
            </LinkOverlay>
          </Card.Title>
        </Card.Body>
      )}
    />
  );
};
