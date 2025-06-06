import { Button, Flex, Icon, Separator, Stack } from "@chakra-ui/react";
import {
  getArrangementListPath,
  getArtistListPath,
  getCompositionListPath,
  getGoalListPath,
  getProfilePath,
  getRoutineListPath,
  getSettingPath,
  getSourceListPath,
  getSupplementaryListPath,
  getTrainingPath,
} from "../../routes";
import { NavItem, NavItemProps } from "./NavItem";
import {
  LuBicepsFlexed,
  LuBookOpenText,
  LuCircleUser,
  LuFiles,
  LuListOrdered,
  LuLogOut,
  LuMusic,
  LuRadio,
  LuSettings,
  LuTarget,
  LuUsers,
} from "react-icons/lu";
import { Footer } from "../footer";
import { Tools } from "../tools";
import { useAuth } from "../../hooks";
import { Title } from "../Title";
// import { CreateButton } from "../CreateButton";

export const Nav = () => {
  const { logout } = useAuth();

  const routes: NavItemProps[] = [
    {
      to: getGoalListPath(),
      label: "Goals",
      icon: LuTarget,
    },
    { to: getRoutineListPath(), label: "Routines", icon: LuListOrdered },
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
    {
      to: getArtistListPath(),
      label: "Artists",
      icon: LuUsers,
    },
    {
      to: getSourceListPath(),
      label: "Sources",
      icon: LuRadio,
    },
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
    { to: getProfilePath(), label: "Profile", icon: LuCircleUser },
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
          {/* <CreateButton /> */}
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
