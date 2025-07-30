import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateMeaning } from '~/hooks/api/useCreateMeaning';
import { MeaningForm } from '~/routes/meanings/components/meaning-form';
import { type Schema } from '~/routes/meanings/schema';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'create-meaning-form';

export const CreateMeaningSheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createMeaning } = useCreateMeaning();

  const handleCreateMeaning = async (data: Schema) => {
    await createMeaning(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title="New meaning"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <MeaningForm id={FORM_ID} onSubmit={handleCreateMeaning} />
    </SheetSidebar>
  );
};
