import { useNavigate } from "react-router-dom";
import {
  useArrangements,
  useCompositions,
  useDeleteComposition,
} from "../../../hooks";
import { getCompositionListPath } from "../../../routes";
import { Composition } from "../../../resources/models";
import { Box, Button, Flex, Span, Stack } from "@chakra-ui/react";
import { ErrorMessage } from "../../ErrorMessage";

interface Props {
  handleClose: () => void;
  composition: Composition;
}

export const DeleteCompositionForm = ({ composition, handleClose }: Props) => {
  const { id, name } = composition;
  const { resources: arrangements } = useArrangements({ compositionId: id });
  const { resources: compositions } = useCompositions({
    partOfCompositionId: id,
  });
  const { deleteResource } = useDeleteComposition();
  const navigate = useNavigate();
  const listPath = getCompositionListPath();

  const numSubresources = arrangements.length + compositions.length;

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
              message={`This composition cannot be deleted because it has ${numSubresources} subresource${
                numSubresources > 1 ? "s" : ""
              }!`}
            />
          )}
          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button
              variant={"surface"}
              onClick={handleClose}
              autoFocus={!!numSubresources}
            >
              Cancel
            </Button>
            <Button
              type={"submit"}
              colorPalette={"red"}
              autoFocus={!numSubresources}
              disabled={!!numSubresources}
            >
              Delete
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
