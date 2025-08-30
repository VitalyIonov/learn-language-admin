import React from "react";
import type { ImageDefinitionOut } from "~/types/api";

import { Button } from "~/components/ui/button";
import { SheetSidebar } from "~/components/sheet-sidebar";
import { useUpdateImageDefinition } from "~/hooks/api/useUpdateImageDefinition";
import { useLoadImageDefinition } from "~/hooks/api/useLoadImageDefinition";
import { Form } from "~/routes/image-definitions/components/form";
import { type Schema } from "~/routes/image-definitions/schema";

type Props = {
  id: ImageDefinitionOut["id"] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = "update-definition-form";

export const UpdateSheet = ({ id, isOpen, onOpenChange, onSuccess }: Props) => {
  const { updateDefinition } = useUpdateImageDefinition({ id });
  const { definition } = useLoadImageDefinition(
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
    imageId: definition?.imageId,
    categoryId: definition.categoryId,
    levelId: definition.levelId,
    meaningIds: definition.meaningIds,
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title="Image definition"
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
        imageUrl={definition.image.imageUrl}
        onSubmit={handleUpdateDefinition}
      />
    </SheetSidebar>
  );
};
