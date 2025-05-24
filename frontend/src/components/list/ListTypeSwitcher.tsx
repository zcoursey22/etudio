import { Icon, Tabs } from "@chakra-ui/react";
import { ListType } from "./ListType";
import { LuLayoutGrid, LuMenu } from "react-icons/lu";
import useLocalStorage from "use-local-storage";
import { LIST_TYPE_KEY } from "../../constants";
import { useSettings } from "../../hooks";

interface Props {
  listTypeKey?: string;
}

export const ListTypeSwitcher = ({ listTypeKey }: Props) => {
  const { settings } = useSettings();

  const [globalListType, setGlobalListType] = useLocalStorage(
    LIST_TYPE_KEY,
    ListType.TABLE
  );
  const [listType, setListType] = useLocalStorage(
    settings.syncListViewType
      ? LIST_TYPE_KEY
      : `${LIST_TYPE_KEY}_${listTypeKey}`,
    globalListType
  );

  const handleChange = (updatedListType: ListType) => {
    setListType(updatedListType);
    setGlobalListType(updatedListType);
  };

  if (listTypeKey === undefined) {
    throw Error("list id must be defined");
  }

  return (
    <Tabs.Root
      value={listType}
      onValueChange={({ value }) => handleChange(value as ListType)}
      variant={"outline"}
      size={"md"}
    >
      <Tabs.List>
        <Tabs.Trigger value={ListType.TABLE}>
          <Icon size={"sm"}>
            <LuMenu />
          </Icon>
        </Tabs.Trigger>
        <Tabs.Trigger value={ListType.GRID}>
          <Icon size={"sm"}>
            <LuLayoutGrid />
          </Icon>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};
