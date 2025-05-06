import { Card, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Supplementary } from "../models";

const supplementaries: Supplementary[] = [
  { id: "1", title: "instruction-book.pdf" },
  { id: "2", title: "recording-reference.wav" },
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
        </>
      )}
      renderRowContents={(item) => (
        <>
          <Table.Cell>{item.title}</Table.Cell>
        </>
      )}
      renderGridItemContents={(item) => (
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
        </Card.Body>
      )}
    />
  );
};
