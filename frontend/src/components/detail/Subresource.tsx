import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Resource } from "../../resources/models";
import { List, ListProps, ListTypeSwitcher } from "../list";
import { Flex, Group, Icon, Tabs, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface SubresourceConfig<T extends Resource> extends ListProps<T> {
  route: string;
  createLabel?: string;
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

  const showIcons = false;

  return (
    <List
      key={config.id}
      {...config}
      title={
        <Flex justify={"space-between"}>
          <Tabs.Root
            value={config.route}
            variant={"outline"}
            onValueChange={({ value }) =>
              navigate(`${basePath}/${value}`, { replace: true })
            }
            size={"md"}
          >
            <Tabs.List>
              {configs?.map(({ route, title, icon, resources }) => (
                <Tabs.Trigger key={route} value={route}>
                  <Group fontSize={"md"}>
                    {showIcons && icon && <Icon size={"sm"}>{icon}</Icon>}
                    <Text>{`${title}${
                      resources ? ` (${resources?.length})` : "0"
                    }`}</Text>
                  </Group>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
          <ListTypeSwitcher listTypeKey={config.id} />
        </Flex>
      }
    />
  );
};
