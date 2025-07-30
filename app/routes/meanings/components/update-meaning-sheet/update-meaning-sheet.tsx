import React from 'react';
import type { MeaningOut } from '~/types/api';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useUpdateMeaning } from '~/hooks/api/useUpdateMeaning';
import { useLoadMeaning } from '~/hooks/api/useLoadMeaning';
import { MeaningForm } from '~/routes/meanings/components/meaning-form';
import { type Schema } from '~/routes/meanings/schema';

type Props = {
  id: MeaningOut['id'] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'update-meaning-form';

export const UpdateMeaningSheet = ({ id, isOpen, onOpenChange, onSuccess }: Props) => {
  const { updateMeaning } = useUpdateMeaning({ id });
  const { meaning } = useLoadMeaning({ id }, { enabled: Boolean(id), gcTime: 0 });

  const handleUpdateMeaning = async (data: Schema) => {
    await updateMeaning(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  if (!meaning) {
    return null;
  }

  const defaultValues = {
    name: meaning?.name || '',
    categoryId: meaning?.category?.id,
    levelId: meaning?.level?.id,
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title={meaning?.name || ''}
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Update
        </Button>
      }
    >
      <MeaningForm id={FORM_ID} defaultValues={defaultValues} onSubmit={handleUpdateMeaning} />
    </SheetSidebar>
  );
};
