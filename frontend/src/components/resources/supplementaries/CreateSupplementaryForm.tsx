import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useResourceContext } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResourcePayload, Supplementary } from "../../../resources/models";
import {
  FieldRow,
  FieldType,
  FavoriteField,
  FieldRowConfig,
} from "../shared/form";

interface Props {
  handleClose: () => void;
  supplementary?: Supplementary;
}

type Payload = ResourcePayload<Supplementary>;

export const CreateSupplementaryForm = ({
  handleClose,
  supplementary,
}: Props) => {
  const { useCreate, useUpdate } = useResourceContext();
  const { createResource } = useCreate();
  const { updateResource } = useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Payload>({ defaultValues: supplementary });

  const submit: SubmitHandler<Payload> = (payload) => {
    payload = {
      ...payload,
      name: payload.name.trim(),
      description: payload.description?.trim(),
    };
    console.log(payload);
    const apiCall = supplementary
      ? updateResource({ id: supplementary.id, payload, method: "PUT" })
      : createResource(payload);
    apiCall
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        handleClose();
      });
  };

  const fieldRows: FieldRowConfig<Payload>[] = [
    [
      {
        render: ({ control }) => (
          <FavoriteField
            control={control}
            register={register}
            errors={errors}
          />
        ),
        key: "favorite",
      },
      {
        name: "name",
        label: "Name",
        type: FieldType.INPUT,
        required: true,
        showRequiredIndicator: true,
        maxLength: 50,
        autoFocus: true,
      },
    ],
    [
      {
        name: "description",
        label: "Description",
        type: FieldType.TEXTAREA,
        showRequiredIndicator: true,
        maxLength: 500,
      },
    ],
  ];

  return (
    <Box>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Stack gap={"1em"}>
          {fieldRows.map((row, i) => (
            <FieldRow
              key={i}
              row={row}
              control={control}
              register={register}
              errors={errors}
            />
          ))}
          <Flex mt={"1em"} gap={"0.5em"} justifyContent={"flex-end"}>
            <Button variant={"surface"} onClick={handleClose}>
              Cancel
            </Button>
            <Button type={"submit"}>
              {supplementary ? "Update" : "Create"}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
