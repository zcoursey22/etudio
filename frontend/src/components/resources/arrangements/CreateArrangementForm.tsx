import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import {
  ApiArrangement,
  useArtists,
  useCompositions,
  useResourceContext,
} from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Arrangement,
  NotationType,
  ResourcePayload,
} from "../../../resources/models";
import {
  FieldType,
  FavoriteField,
  FieldRowConfig,
  FieldRow,
} from "../shared/form";
import { LoadingMessage } from "../../LoadingMessage";
import { DifficultyField } from "./DifficultyField";
import { getNotationTypeLabel } from "./arrangementUtils";

interface Props {
  handleClose: () => void;
  arrangement?: Arrangement;
  compositionId?: string | number;
}

type Payload = ResourcePayload<ApiArrangement>;

export const CreateArrangementForm = ({
  handleClose,
  arrangement,
  compositionId,
}: Props) => {
  const { resources: artists, loading: artistsLoading } = useArtists();
  const { resources: compositions, loading: compositionsLoading } =
    useCompositions();

  const notationTypes = Object.keys(NotationType) as Array<
    keyof typeof NotationType
  >;

  const { useCreate, useUpdate } = useResourceContext();
  const { createResource } = useCreate();
  const { updateResource } = useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Payload>({ defaultValues: arrangement });

  const submit: SubmitHandler<Payload> = ({
    name,
    description,
    artistId,
    isFavorite,
    compositionId,
    difficulty,
    notationType,
  }) => {
    const payload = {
      name: name.trim(),
      description: description?.trim(),
      isFavorite,
      difficulty,
      notationType,
      artistId: Number(artistId),
      compositionId: Number(compositionId),
    };
    console.log(payload);
    const apiCall = arrangement
      ? updateResource({ id: arrangement.id, payload, method: "PUT" })
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
        name: "compositionId",
        label: "Composition",
        type: FieldType.SELECT,
        placeholder: "Select a composition",
        required: true,
        showRequiredIndicator: true,
        values: compositions.map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
        defaultValue: compositionId,
        disabled: !!compositionId,
        autoFocus: !arrangement && !compositionId,
      },
    ],
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
        autoFocus: !!arrangement || !!compositionId,
      },
    ],
    [
      {
        render: ({ control }) => (
          <DifficultyField
            control={control}
            register={register}
            errors={errors}
          />
        ),
        key: "difficulty",
      },
      {
        name: "artistId",
        label: "Arranger",
        type: FieldType.SELECT,
        placeholder: "Select an artist",
        required: true,
        showRequiredIndicator: true,
        values: artists.map((artist) => ({
          value: String(artist.id),
          label: artist.name,
        })),
      },
    ],
    [
      {
        name: "notationType",
        label: "Notation",
        type: FieldType.RADIO,
        required: true,
        showRequiredIndicator: true,
        defaultValue: arrangement?.notationType,
        values: notationTypes.map((type) => ({
          value: NotationType[type],
          label: getNotationTypeLabel(NotationType[type], true),
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

  if (artistsLoading || compositionsLoading) {
    return <LoadingMessage />;
  }

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
            <Button type={"submit"}>{arrangement ? "Update" : "Create"}</Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
