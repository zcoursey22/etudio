import { useNavigate } from "react-router-dom";
import { useCompositions, useDeleteGoal, useSources } from "../../../hooks";
import { getGoalListPath } from "../../../routes";
import { Source } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";
import { ErrorMessage } from "../../ErrorMessage";

interface Props {
  handleClose: () => void;
  source: Source;
}

export const DeleteSourceForm = ({ source, handleClose }: Props) => {
  const { id, name } = source;

  const { resources: sources } = useSources({ parentId: id });
  const { resources: compositions } = useCompositions({
    sourceId: id,
  });
  const numSubresources = sources.length + compositions.length;

  const { deleteResource } = useDeleteGoal();
  const navigate = useNavigate();
  const listPath = getGoalListPath();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (numSubresources) {
      return;
    }
    deleteResource(id)
      .then(() => {
        if (location.pathname.startsWith(`${listPath}/`)) {
          navigate(listPath, { replace: true });
        }
        handleClose();
      })
      .catch((err) => console.error(err));
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
          {!!numSubresources && (
            <ErrorMessage
              message={`This source cannot be deleted because it has ${numSubresources} subresource${
                numSubresources > 1 ? "s" : ""
              }!`}
            />
          )}
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
