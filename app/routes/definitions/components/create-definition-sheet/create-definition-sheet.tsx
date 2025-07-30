import React from 'react';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useCreateDefinition } from '~/hooks/api/useCreateDefinition';
import { DefinitionForm } from '~/routes/definitions/components/definition-form';
import { type Schema } from '~/routes/definitions/schema';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'create-definition-form';

export const CreateDefinitionSheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createDefinition } = useCreateDefinition();

  const handleCreateDefinition = async (data: Schema) => {
    await createDefinition(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title="New definition"
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Create
        </Button>
      }
    >
      <DefinitionForm id={FORM_ID} onSubmit={handleCreateDefinition} />
    </SheetSidebar>
  );
};
