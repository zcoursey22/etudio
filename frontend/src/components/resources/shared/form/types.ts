import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export enum FieldType {
  INPUT,
  TEXTAREA,
  SELECT,
  RADIO,
}

export type BaseFieldConfig<T extends FieldValues> = {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
  showRequiredIndicator?: boolean;
  maxLength?: number;
  defaultValue?: T[keyof T];
  values?: readonly { value: T[keyof T]; label: string }[];
  autoFocus?: boolean;
  placeholder?: string;
  hidden?: boolean;
  disabled?: boolean;
};

export type CustomFieldProps<T extends FieldValues> = {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export type CustomFieldConfig<T extends FieldValues> = {
  render: (props: CustomFieldProps<T>) => React.ReactNode;
  key: string;
};

export type FieldConfig<T extends FieldValues> =
  | BaseFieldConfig<T>
  | CustomFieldConfig<T>;

export type FieldRowConfig<T extends FieldValues> = FieldConfig<T>[];
