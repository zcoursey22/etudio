import { Button, Flex, Stack } from "@chakra-ui/react";
import {
  getCompositionListPath,
  getProfilePath,
  getRoutineListPath,
  getSettingPath,
  getSupplementaryListPath,
} from "../../routes";
import { NavItem, NavItemProps } from "./NavItem";
import {
  LuBook,
  LuHouse,
  LuListMusic,
  LuMusic,
  LuSettings,
  LuUser,
} from "react-icons/lu";
import { Footer } from "../footer";
import { Tools } from "../tools";
import { Title } from "../Title";

export const Nav = () => {
  const routes: NavItemProps[] = [
    { to: "/", label: "Home", icon: LuHouse },
    { to: getCompositionListPath(), label: "Compositions", icon: LuMusic },
    { to: getRoutineListPath(), label: "Routines", icon: LuListMusic },
    { to: getSupplementaryListPath(), label: "Supplementaries", icon: LuBook },
  ];

  const auxRoutes: NavItemProps[] = [
    { to: getProfilePath(), label: "Profile", icon: LuUser },
    { to: getSettingPath(), label: "Settings", icon: LuSettings },
  ];

  return (
    <Flex
      flexDirection={"column"}
      justify={"space-between"}
      gap={"1em"}
      minWidth={"12em"}
      p="1em"
      pr="0"
    >
      <Stack gap={"1em"}>
        {/* <Title /> */}
        <Stack as={"nav"}>
          {routes.map(({ to, label, icon }) => (
            <NavItem to={to} label={label} icon={icon} />
          ))}
        </Stack>
        <Tools />
      </Stack>
      <Stack gap={"1em"}>
        <Stack as={"nav"}>
          {auxRoutes.map(({ to, label, icon }) => (
            <NavItem to={to} label={label} icon={icon} />
          ))}
        </Stack>
        <Button variant={"surface"}>Sign out</Button>
        <Footer />
      </Stack>
    </Flex>
  );
};
