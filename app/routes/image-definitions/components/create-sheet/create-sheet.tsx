import React from "react";

import { Button } from "~/components/ui/button";
import { SheetSidebar } from "~/components/sheet-sidebar";
import { useCreateImageDefinition } from "~/hooks/api/useCreateImageDefinition";
import { Form } from "~/routes/image-definitions/components/form";
import { type Schema } from "~/routes/image-definitions/schema";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = "create-definition-form";

export const CreateSheet = ({ isOpen, onOpenChange, onSuccess }: Props) => {
  const { createDefinition } = useCreateImageDefinition();

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
      <Form id={FORM_ID} onSubmit={handleCreateDefinition} />
    </SheetSidebar>
  );
};
