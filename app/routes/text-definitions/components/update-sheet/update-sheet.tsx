import React from "react";
import type { DefinitionOut } from "~/types/api";

import { Button } from "~/components/ui/button";
import { SheetSidebar } from "~/components/sheet-sidebar";
import { useUpdateTextDefinition } from "~/hooks/api/useUpdateTextDefinition";
import { useLoadTextDefinition } from "~/hooks/api/useLoadTextDefinition";
import { Form } from "~/routes/text-definitions/components/form";
import { type Schema } from "~/routes/text-definitions/schema";

type Props = {
  id: DefinitionOut["id"] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = "update-definition-form";

export const UpdateSheet = ({ id, isOpen, onOpenChange, onSuccess }: Props) => {
  const { updateDefinition } = useUpdateTextDefinition({ id });
  const { definition } = useLoadTextDefinition(
    { id },
    { enabled: Boolean(id), gcTime: 0 },
  );

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
    text: definition?.text || "",
    categoryId: definition.categoryId,
    levelId: definition.levelId,
    meaningIds: definition.meaningIds,
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title={definition?.text || ""}
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Update
        </Button>
      }
    >
      <Form
        id={FORM_ID}
        defaultValues={defaultValues}
        onSubmit={handleUpdateDefinition}
      />
    </SheetSidebar>
  );
};
