import React from 'react';
import type { DefinitionOut } from '~/types/api';

import { Button } from '~/components/ui/button';
import { SheetSidebar } from '~/components/sheet-sidebar';
import { useUpdateDefinition } from '~/hooks/api/useUpdateDefinition';
import { useLoadDefinition } from '~/hooks/api/useLoadDefinition';
import { DefinitionForm } from '~/routes/definitions/components/definition-form';
import { type Schema } from '~/routes/definitions/schema';

type Props = {
  id: DefinitionOut['id'] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = 'update-definition-form';

export const UpdateDefinitionSheet = ({ id, isOpen, onOpenChange, onSuccess }: Props) => {
  const { updateDefinition } = useUpdateDefinition({ id });
  const { definition } = useLoadDefinition({ id }, { enabled: Boolean(id), gcTime: 0 });

  const handleUpdateDefinition = async (data: Schema) => {
    await updateDefinition(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  if (!definition) {
    return null;
  }

  const defaultValues = {
    text: definition?.text || '',
    categoryId: definition.categoryId,
    levelId: definition.levelId,
    meaningIds: definition.meaningIds,
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title={definition?.text || ''}
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Update
        </Button>
      }
    >
      <DefinitionForm
        id={FORM_ID}
        defaultValues={defaultValues}
        onSubmit={handleUpdateDefinition}
      />
    </SheetSidebar>
  );
};
