import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useResourceContext } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Goal, GoalStatus, ResourcePayload } from "../../../resources/models";
import { getStatusLabel } from "./goalUtils";
import {
  FieldRow,
  FieldType,
  FavoriteField,
  FieldRowConfig,
} from "../shared/form";

interface Props {
  handleClose: () => void;
  goal?: Goal;
}

type Payload = ResourcePayload<Goal>;

export const CreateGoalForm = ({ handleClose, goal }: Props) => {
  const { useCreate, useUpdate } = useResourceContext();
  const { createResource } = useCreate();
  const { updateResource } = useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Payload>({ defaultValues: goal });

  const submit: SubmitHandler<Payload> = (payload) => {
    payload = {
      ...payload,
      name: payload.name.trim(),
      description: payload.description?.trim(),
    };
    console.log(payload);
    const apiCall = goal
      ? updateResource({ id: goal.id, payload, method: "PUT" })
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
        name: "status",
        label: "Status",
        type: FieldType.RADIO,
        required: true,
        defaultValue: goal?.status || GoalStatus.NOT_STARTED,
        values: [
          GoalStatus.NOT_STARTED,
          GoalStatus.IN_PROGRESS,
          GoalStatus.PAUSED,
          GoalStatus.DONE,
        ].map((status) => ({
          value: status,
          label: getStatusLabel(status),
        })),
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
            <Button type={"submit"}>{goal ? "Update" : "Create"}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
