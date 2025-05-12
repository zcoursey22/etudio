import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { Resource } from "../../models";
import { ListViewContainer, ListViewContainerProps } from "../list";
import { Icon, Tabs } from "@chakra-ui/react";
import { NavLink } from "../nav/NavLink";
import { ReactNode } from "react";

export interface SubresourceConfig<T extends Resource>
  extends ListViewContainerProps<T> {
  route: string;
  icon?: ReactNode;
}

type SubresourceContext<T extends Resource> = {
  configs: SubresourceConfig<T>[];
};

export const Subresource = <T extends Resource>() => {
  const { configs } = useOutletContext<SubresourceContext<T>>();
  const { id } = useParams();
  const { pathname } = useLocation();

  const pathParts = pathname.split("/");
  const basePath =
    pathParts[pathParts.length - 1] !== id
      ? pathParts.slice(0, -1).join("/")
      : pathname;

  const config =
    configs.find((c) => c.route === pathParts[pathParts.length - 1]) ??
    configs[0];

  return (
    <ListViewContainer
      {...config}
      title={
        <Tabs.Root defaultValue={config.route} variant={"outline"}>
          <Tabs.List>
            {configs?.map(({ route, title, icon }) => (
              <Tabs.Trigger asChild key={route} value={route}>
                <NavLink
                  to={`${basePath}/${route}`}
                  replace
                  unstyled
                  colorPalette={"auto"}
                  fontSize={"md"}
                >
                  {icon && <Icon>{icon}</Icon>}
                  {title}
                </NavLink>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      }
    />
  );
};
