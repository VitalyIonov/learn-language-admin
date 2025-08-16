import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateCategory } from '~/hooks/api/useCreateCategory';
import { CategoryForm } from '~/routes/categories/components/category-form';
import { type Schema } from '~/routes/categories/schema';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'create-category-form';

export const CreateCategorySheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createCategory } = useCreateCategory();

  const handleCreateCategory = async (data: Schema) => {
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
      title="New Category"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <CategoryForm id={FORM_ID} onSubmit={handleCreateCategory} />
    </SheetSidebar>
  );
};
