import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Resource } from "../../models";
import { ListViewContainer, ListViewContainerProps } from "../list";
import { Group, Icon, Tabs, Text } from "@chakra-ui/react";
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

  const navigate = useNavigate();

  const pathParts = pathname.split("/");
  const isOnSubresource = pathParts[pathParts.length - 1] !== id;
  const subresourceRoute = isOnSubresource
    ? pathParts[pathParts.length - 1]
    : null;
  const basePath = isOnSubresource
    ? pathParts.slice(0, -1).join("/")
    : pathname;

  const config =
    configs.find((c) => c.route === subresourceRoute) ?? configs[0];

  return (
    <ListViewContainer
      {...config}
      title={
        <Tabs.Root
          value={config.route}
          variant={"outline"}
          onValueChange={({ value }) =>
            navigate(`${basePath}/${value}`, { replace: true })
          }
        >
          <Tabs.List>
            {configs?.map(({ route, title, icon, useResourcesState }) => (
              <Tabs.Trigger key={route} value={route}>
                <Group fontSize={"md"}>
                  {icon && <Icon>{icon}</Icon>}
                  <Text>{`${title}${
                    useResourcesState?.resources
                      ? ` (${useResourcesState?.resources?.length})`
                      : ""
                  }`}</Text>
                </Group>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      }
    />
  );
};
