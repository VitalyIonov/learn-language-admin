import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateLevel } from '~/hooks/api/useCreateLevel';
import { CreateLevelForm } from '~/routes/levels/components/create-level-sheet/elements/create-level-form';
import { type CreateLevelFormValues } from '~/routes/levels/components/create-level-sheet/types';
import { FORM_ID } from '~/routes/levels/components/create-level-sheet/constants';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const CreateLevelSheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createLevel } = useCreateLevel();

  const handleCreateLevel = async (data: CreateLevelFormValues) => {
    await createLevel(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title="Levels"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <CreateLevelForm id={FORM_ID} onSubmit={handleCreateLevel} />
    </SheetSidebar>
  );
};
