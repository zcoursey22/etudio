import { Button, Flex, Icon, Separator, Stack } from "@chakra-ui/react";
import {
  getArrangementListPath,
  getCompositionListPath,
  getProfilePath,
  getRoutineListPath,
  getSettingPath,
  getSupplementaryListPath,
  getTrainingPath,
} from "../../routes";
import { NavItem, NavItemProps } from "./NavItem";
import {
  LuBicepsFlexed,
  LuBookOpenText,
  LuFiles,
  LuListOrdered,
  LuLogOut,
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

  const trainingRoutes: NavItemProps[] = [
    { to: getTrainingPath(), label: "Training", icon: LuBicepsFlexed },
  ];

  const adminRoutes: NavItemProps[] = [
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
        <Stack>
          <Stack as={"nav"} gap={"1em"}>
            <Stack>
              {routes.map(({ to, label, icon }) => (
                <NavItem key={to} to={to} label={label} icon={icon} />
              ))}
            </Stack>
            <Separator />
            {trainingRoutes.map(({ to, label, icon }) => (
              <NavItem key={to} to={to} label={label} icon={icon} />
            ))}
          </Stack>
          <Tools />
        </Stack>
      </Stack>
      <Stack gap={"1em"}>
        <Stack as={"nav"}>
          {adminRoutes.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} />
          ))}
        </Stack>
        <Button variant={"surface"} onClick={logout}>
          <Icon>
            <LuLogOut />
          </Icon>
          Log out
        </Button>
        <Footer />
      </Stack>
    </Flex>
  );
};
