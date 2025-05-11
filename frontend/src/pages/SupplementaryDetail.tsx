import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { BackButton, DetailViewContainer } from "../components/detail";
import { useSupplementary } from "../hooks";
import { useParams } from "react-router-dom";

export const SupplementaryDetail = () => {
  const { id } = useParams();
  const detailState = useSupplementary(id!);

  return (
    <DetailViewContainer useResourceState={detailState}>
      {({ name }) => (
        <Stack color={"fg.muted"}>
          <Flex gap={"0.5em"}>
            <BackButton />
            <Box>
              <Box>
                <Text>
                  <Heading display="inline-block" color={"fg"}>
                    {name}
                  </Heading>
                </Text>
                <Text fontSize={"sm"}>supplementary</Text>
              </Box>
            </Box>
          </Flex>
        </Stack>
      )}
    </DetailViewContainer>
  );
};
