import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { Resource } from "../../models";
import { ListViewContainer, ListViewContainerProps } from "../list";
import { Group } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";

export interface SubresourceConfig<T extends Resource>
  extends ListViewContainerProps<T> {
  route: string;
}

type SubresourceContext<T extends Resource> = {
  configs: SubresourceConfig<T>[];
};

export const Subresource = <T extends Resource>() => {
  const { configs } = useOutletContext<SubresourceContext<T>>();
  const config = configs[0];
  const { id } = useParams();
  const { pathname } = useLocation();

  const pathParts = pathname.split("/");
  const basePath =
    pathParts[pathParts.length - 1] !== id
      ? pathParts.slice(0, -1).join("/")
      : pathname;

  return (
    <ListViewContainer
      {...config}
      title={
        <Group>
          {configs?.map(({ route, title }) => (
            <NavLink
              key={route}
              to={`${basePath}/${route}`}
              color={"fg"}
              fontSize={"md"}
              replace
            >
              {title}
            </NavLink>
          ))}
        </Group>
      }
    />
  );
};
