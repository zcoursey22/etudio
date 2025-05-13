import { Group, Icon, Link, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";

export const Footer = () => {
  return (
    <Group as={"footer"}>
      <Link href={"https://github.com/zcoursey22/etudio"} target={"_blank"}>
        <Icon fill="fg">
          <FaGithub />
        </Icon>
      </Link>
      <Text color={"fg.muted"} fontSize={"xs"}>
        Developed by Zach Coursey
      </Text>
    </Group>
  );
};
