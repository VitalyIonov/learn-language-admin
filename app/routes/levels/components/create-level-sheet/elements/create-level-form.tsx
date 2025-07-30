import { Form } from '~/components/form';
import { useCreateLevelForm } from '~/routes/levels/components/create-level-sheet/hooks/useCreateLevelForm';
import { type CreateLevelFormValues } from '~/routes/levels/components/create-level-sheet/types';
import { InputField } from '~/components/form-fields';

type Props = {
  id: string;
  onSubmit: (data: CreateLevelFormValues) => void;
};

export const CreateLevelForm = ({ id, onSubmit }: Props) => {
  const { formMethods, control } = useCreateLevelForm();

  return (
    <Form methods={formMethods} onSubmit={onSubmit} id={id}>
      <InputField name="name" label="Category" control={control} />
      <InputField name="alias" label="Alias" control={control} />
    </Form>
  );
};
