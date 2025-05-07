import { Card, Checkbox, Icon, LinkOverlay, Table } from "@chakra-ui/react";
import { ListViewContainer } from "../components/list";
import { Composition } from "../models";
import { NavLink } from "../components/nav/NavLink";
import { getComposerDetailPath, getCompositionDetailPath } from "../routes";
import { formatDate } from "../utils";
import { LuStar } from "react-icons/lu";

const nocturneOp9: Composition = {
  id: "7",
  created: new Date(),
  lastModified: new Date(),
  title: "Nocturne, Op. 9",
  composer: "Frederic Chopin",
  arrangements: 1,
};

const compositions: Composition[] = [
  {
    id: "1",
    created: new Date(),
    lastModified: new Date(),
    isFavorite: true,
    title: "Ode to Joy",
    composer: "Ludwig van Beethoven",
    arrangements: 2,
    partOf: {
      composer: "Ludwig van Beethoven",
      title: "Symphony No. 9",
      arrangements: 0,
      id: "5",
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: "2",
    created: new Date(),
    lastModified: new Date(),
    title: "Cello Suite No. 1 - Prelude",
    composer: "Johann Sebastian Bach",
    arrangements: 0,
    partOf: {
      id: "6",
      created: new Date(),
      lastModified: new Date(),
      title: "Cello Suite No. 1",
      composer: "Johann Sebastian Bach",
      arrangements: 0,
    },
  },
  {
    id: "3",
    created: new Date(),
    lastModified: new Date(),
    title: "Nocturne, Op. 9, No. 2",
    composer: "Frederic Chopin",
    arrangements: 1,
    partOf: nocturneOp9,
  },
  {
    id: "4",
    created: new Date(),
    lastModified: new Date(),
    title: "Athletic Theme",
    composer: "Koji Kondo",
    arrangements: 0,
    source: { name: "Yoshi's Island" },
  },
  nocturneOp9,
  {
    id: "8",
    created: new Date(),
    lastModified: new Date(),
    title: "Bixby Canyon Bridge",
    composer: "Death Cab for Cutie",
    arrangements: 1,
    collection: { title: "Narrow Stairs", artist: "Death Cab for Cutie" },
  },
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
          <Table.ColumnHeader width={"1"}>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.ColumnHeader>
          <Table.ColumnHeader width={"1"}>
            <Icon>
              <LuStar fill="white" />
            </Icon>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Composer</Table.ColumnHeader>
          <Table.ColumnHeader>From</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Last modified</Table.ColumnHeader>
        </>
      )}
      renderRowContents={({
        id,
        lastModified,
        isFavorite,
        title,
        composer,
        source,
        partOf,
        collection,
      }) => (
        <>
          <Table.Cell>
            <Checkbox.Root colorPalette={"blue"}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell>
            <Icon color={isFavorite ? "orange" : "fg"}>
              <LuStar fill={isFavorite ? "orange" : "none"} />
            </Icon>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getCompositionDetailPath(id)}>{title}</NavLink>
          </Table.Cell>
          <Table.Cell>
            <NavLink to={getComposerDetailPath(id)}>{composer}</NavLink>
          </Table.Cell>
          <Table.Cell>
            {partOf
              ? partOf.title
              : source
              ? source.name
              : collection
              ? collection.title
              : "-"}
          </Table.Cell>
          <Table.Cell textAlign="end">{formatDate(lastModified)}</Table.Cell>
        </>
      )}
      renderGridItemContents={({ id, title, composer, isFavorite }) => (
        <>
          <Card.Body>
            <Card.Title>
              <LinkOverlay asChild>
                <NavLink
                  colorPalette={"gray"}
                  to={getCompositionDetailPath(id)}
                >
                  {title}
                </NavLink>
              </LinkOverlay>
            </Card.Title>
            <Card.Description>
              <NavLink to={getComposerDetailPath(id)}>{composer}</NavLink>
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Icon color={isFavorite ? "orange" : "fg"}>
              <LuStar fill={isFavorite ? "orange" : "none"} />
            </Icon>
          </Card.Footer>
        </>
      )}
    />
  );
};
