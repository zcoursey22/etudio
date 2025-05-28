import { Box, Button, Flex } from "@chakra-ui/react";
import { useCreateGoal } from "../../../hooks";

interface Props {
  handleClose: () => void;
}

export const CreateGoalForm = ({ handleClose }: Props) => {
  const { createResource } = useCreateGoal();

  return (
    <Box>
      <Flex gap={"0.5em"} justifyContent={"flex-end"}>
        <Button variant={"surface"} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            createResource({ name: "test", status: "not_started" })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                handleClose();
              });
          }}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
};
