import { useNavigate } from "react-router-dom";
import { useDeleteGoal } from "../../../hooks";
import { getGoalListPath } from "../../../routes";
import { Goal } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";

interface Props {
  handleClose: () => void;
  goal: Goal;
}

export const DeleteGoalForm = ({ goal, handleClose }: Props) => {
  const { id, name } = goal;
  const { deleteResource } = useDeleteGoal();
  const navigate = useNavigate();
  const listPath = getGoalListPath();

  const submit = () => {
    deleteResource(id);
    if (location.pathname.startsWith(`${listPath}/`)) {
      navigate(listPath, { replace: true });
    }
    handleClose();
  };

  return (
    <Box>
      <form onSubmit={submit}>
        <Stack gap={"1em"}>
          <Span color={"fg.muted"}>
            Are you sure you want to delete{" "}
            <Span fontWeight={"semibold"} color={"fg"}>
              {name}
            </Span>
            ?
          </Span>
          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"} colorPalette={"red"} autoFocus>
              Delete
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
