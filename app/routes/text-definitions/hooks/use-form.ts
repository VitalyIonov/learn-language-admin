import { useForm as useBaseForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Schema, schema } from "~/routes/text-definitions/schema";

type Props = {
  defaultValues?: Schema;
};

export const useForm = ({ defaultValues }: Props) => {
  const formMethods = useBaseForm<Schema>({
    mode: "onSubmit",
    defaultValues,
    resolver: async (data, context, options) => {
      return zodResolver(schema)(data, context, options);
    },
  });

  const { watch, control } = formMethods;

  const formValues = watch();

  return {
    formMethods,
    control,
    formValues,
  };
};
