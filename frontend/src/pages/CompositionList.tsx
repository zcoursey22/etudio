import { Card, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Composition } from "../models";

const compositions: Composition[] = [
  {
    id: "1",
    title: "Ode to Joy",
    composer: "Ludvig von Beethoven",
    favorited: true,
  },
  { id: "2", title: "Cello Prelude", composer: "Johann Sebastian Bach" },
  { id: "3", title: "Nocturne", composer: "Frederick Chopin" },
];
const loading = false;
const error = undefined;

export const CompositionList = () => {
  return (
    <ListViewContainer
      title="Compositions"
      items={compositions}
      loading={loading}
      error={error}
      renderHeaderRowContents={() => (
        <>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Composer</Table.ColumnHeader>
        </>
      )}
      renderRowContents={(item) => (
        <>
          <Table.Cell>{item.title}</Table.Cell>
          <Table.Cell>{item.composer}</Table.Cell>
        </>
      )}
      renderGridItemContents={(item) => (
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Description>{item.composer}</Card.Description>
        </Card.Body>
      )}
    />
  );
};
