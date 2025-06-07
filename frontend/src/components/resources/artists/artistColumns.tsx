import { Artist } from "../../../resources/models";
import { getArtistDetailPath } from "../../../routes";
import { ColumnMap } from "../../list/table/columns";
import { NavLink } from "../../nav";
import { ActionConfig, ActionMenu } from "../shared";

export const getArtistColumns = (
  actions: ActionConfig<Artist>[]
): ColumnMap<Artist> => ({
  name: {
    header: "Name",
    render: ({ id, name }) => (
      <NavLink to={getArtistDetailPath(id)}>{name}</NavLink>
    ),
  },
  actions: {
    width: "1",
    render: (resource) => <ActionMenu resource={resource} actions={actions} />,
  },
});
