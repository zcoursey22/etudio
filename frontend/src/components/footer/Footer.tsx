import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as={"footer"}>
      <Text color={"fg.muted"} fontSize={"xs"}>
        Developed by Zach Coursey
      </Text>
    </Box>
  );
};
