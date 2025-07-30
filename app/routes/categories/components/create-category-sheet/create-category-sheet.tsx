import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateCategory } from '~/hooks/api/useCreateCategory';
import { CreateCategoryForm } from '~/routes/categories/components/create-category-sheet/elements/create-category-form';
import { type CreateCategoryFormValues } from '~/routes/categories/components/create-category-sheet/types';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'create-category-form';

export const CreateCategorySheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createCategory } = useCreateCategory();

  const handleCreateCategory = async (data: CreateCategoryFormValues) => {
    await createCategory(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title="Categories"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <CreateCategoryForm id={FORM_ID} onSubmit={handleCreateCategory} />
    </SheetSidebar>
  );
};
