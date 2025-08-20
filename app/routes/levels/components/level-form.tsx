import { useEffect } from "react";
import { Form } from "~/components/form";
import { InputField, QuestionTypesField } from "~/components/form-fields";
import { useLevelForm } from "~/routes/levels/hooks/use-level-form";
import { type Schema } from "~/routes/levels/schema";

type Props = {
  id: string;
  defaultValues?: Schema;
  onSubmit: (data: Schema) => void;
};

export function LevelForm({ id, defaultValues, onSubmit }: Props) {
  const { formMethods, control } = useLevelForm({ defaultValues });

  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="name" label="Name" control={control} />
      <InputField name="alias" label="Alias" control={control} />
      <QuestionTypesField
        name="questionTypeIds"
        label="Question types"
        control={control}
      />
    </Form>
  );
}
