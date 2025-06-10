import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Resource } from "../../resources/models";
import { List, ListContainer, ListTypeSwitcher } from "../list";
import { Flex, Group, Icon, IconButton, Tabs, Text } from "@chakra-ui/react";
import { registry } from "../../resources/registry";
import { ResourceProvider } from "../../providers";
import { useAllSubresourceLists, useResourceContext } from "../../hooks";
import { LuPlus } from "react-icons/lu";

type SubresourceContext<T extends Resource> = {
  resource: T;
};

export const Subresource = <T extends Resource>() => {
  const { resource } = useOutletContext<SubresourceContext<T>>();
  const { resourceType } = useResourceContext();
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pathParts = pathname.split("/");
  const isOnSubresource = pathParts[pathParts.length - 1] !== id;
  const activeSubresourceRouteSegment = isOnSubresource
    ? pathParts[pathParts.length - 1]
    : null;
  const basePath = isOnSubresource
    ? pathParts.slice(0, -1).join("/")
    : pathname;

  const subresources = registry[resourceType].subresources ?? [];
  const subresourceListStates = useAllSubresourceLists(
    subresources.map((s) => ({
      type: s.type,
      queryParams: s.getQueryParams?.(resource) ?? {},
    }))
  );
  const activeSubresource =
    subresources.find(({ route }) => route === activeSubresourceRouteSegment) ??
    subresources[0];

  const subresourceUseActionCalls = subresources.reduce((acc, sr) => {
    acc[sr.type] = registry[sr.type].useActions();
    return acc;
  }, {} as Record<string, ReturnType<(typeof registry)[keyof typeof registry]["useActions"]>>);
  const { actions: subresourceActions, modal: subresourceModal } =
    subresourceUseActionCalls[activeSubresource.type];
  const createSubresourceAction = subresourceActions.find(
    (a) => a.key === "create" && a.visible !== false
  );

  const showIcons = true;

  return (
    <ResourceProvider
      key={activeSubresource.type}
      type={activeSubresource.type}
    >
      <ListContainer
        columnOverrides={activeSubresource.columnOverrides}
        actionOverrides={activeSubresource.actionOverrides}
        queryParams={activeSubresource.getQueryParams(resource)}
      >
        {({ listState, columnOverrides, actionOverrides }) => (
          <List
            id={activeSubresource.type}
            key={activeSubresource.type}
            listState={listState}
            columnOverrides={columnOverrides}
            actionOverrides={actionOverrides}
            title={
              <Flex justify={"space-between"}>
                <Tabs.Root
                  value={activeSubresource.route}
                  variant={"outline"}
                  onValueChange={({ value }) =>
                    navigate(`${basePath}/${value}`, { replace: true })
                  }
                  size={"md"}
                >
                  <Tabs.List>
                    {subresources?.map(({ route, icon, title, type }) => (
                      <Tabs.Trigger key={route} value={route}>
                        <Group fontSize={"md"}>
                          {showIcons && icon && <Icon size={"sm"}>{icon}</Icon>}
                          <Text>{`${title}${
                            subresourceListStates[type]?.resources
                              ? ` (${subresourceListStates[type].resources.length})`
                              : "0"
                          }`}</Text>
                        </Group>
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                </Tabs.Root>
                <Flex align={"center"} gap={"1em"}>
                  {!!createSubresourceAction && (
                    <>
                      <IconButton
                        size={"xs"}
                        onClick={() =>
                          createSubresourceAction.onClick(resource)
                        }
                      >
                        <Icon size={"sm"}>
                          <LuPlus />
                        </Icon>
                      </IconButton>
                      {subresourceModal}
                    </>
                  )}
                  <ListTypeSwitcher listTypeKey={activeSubresource.type} />
                </Flex>
              </Flex>
            }
          />
        )}
      </ListContainer>
    </ResourceProvider>
  );
};
