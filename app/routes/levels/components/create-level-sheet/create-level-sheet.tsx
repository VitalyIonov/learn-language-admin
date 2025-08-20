import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateLevel } from '~/hooks/api/useCreateLevel';
import { LevelForm } from '~/routes/levels/components/level-form';
import { type Schema } from '~/routes/levels/schema';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'create-level-form';

export const CreateLevelSheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createLevel } = useCreateLevel();

  const handleCreateLevel = async (data: Schema) => {
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
      title="New level"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <LevelForm id={FORM_ID} onSubmit={handleCreateLevel} />
    </SheetSidebar>
  );
};
