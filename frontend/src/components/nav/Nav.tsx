import { Button, Flex, Stack } from "@chakra-ui/react";
import {
  getArrangementListPath,
  getCompositionListPath,
  getProfilePath,
  getRoutineListPath,
  getSettingPath,
  getSupplementaryListPath,
} from "../../routes";
import { NavItem, NavItemProps } from "./NavItem";
import {
  LuBookOpenText,
  LuFiles,
  LuHouse,
  LuListOrdered,
  LuMusic,
  LuSettings,
  LuUser,
} from "react-icons/lu";
import { Footer } from "../footer";
import { Tools } from "../tools";
import { useAuth } from "../../hooks/useAuth";
import { Title } from "../Title";

export const Nav = () => {
  const { logout } = useAuth();

  const routes: NavItemProps[] = [
    { to: "/", label: "Home", icon: LuHouse },
    {
      to: getCompositionListPath(),
      label: "Compositions",
      icon: LuMusic,
    },
    {
      to: getArrangementListPath(),
      label: "Scores",
      icon: LuBookOpenText,
    },
    { to: getRoutineListPath(), label: "Routines", icon: LuListOrdered },
    {
      to: getSupplementaryListPath(),
      label: "Supplementaries",
      icon: LuFiles,
    },
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
      p={"1em"}
      pr={"0.5em"}
      ml={"0.5em"}
      overflowY={"auto"}
      scrollbarGutter={"stable"}
    >
      <Stack gap={"1em"}>
        <Title />
        <Stack as={"nav"}>
          {routes.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} />
          ))}
        </Stack>
        <Tools />
      </Stack>
      <Stack gap={"1em"}>
        <Stack as={"nav"}>
          {auxRoutes.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} />
          ))}
        </Stack>
        <Button variant={"surface"} onClick={logout}>
          Sign out
        </Button>
        <Footer />
      </Stack>
    </Flex>
  );
};
