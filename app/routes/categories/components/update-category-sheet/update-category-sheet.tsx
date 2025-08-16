import React from "react";
import type { CategoryOut } from "~/types/api";

import { Button } from "~/components/ui/button";
import { SheetSidebar } from "~/components/sheet-sidebar";
import { useUpdateCategory } from "~/hooks/api/useUpdateCategory";
import { useLoadCategory } from "~/hooks/api/useLoadCategory";
import { CategoryForm } from "~/routes/categories/components/category-form";
import { type Schema } from "~/routes/categories/schema";

type Props = {
  id: CategoryOut["id"] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const FORM_ID = "update-category-form";

export const UpdateCategorySheet = ({
  id,
  isOpen,
  onOpenChange,
  onSuccess,
}: Props) => {
  const { updateCategory } = useUpdateCategory({ id });
  const { category } = useLoadCategory(
    { id },
    { enabled: Boolean(id), gcTime: 0 },
  );

  const handleUpdateCategory = async (data: Schema) => {
    await updateCategory(data, {
      onSuccess: () => {
        onSuccess?.();
        onOpenChange(false);
      },
    });
  };

  if (!category) {
    return null;
  }

  const defaultValues = {
    name: category?.name || "",
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title={category?.name || ""}
      onOpenChange={onOpenChange}
      actionButton={
        <Button type="submit" form={FORM_ID}>
          Update
        </Button>
      }
    >
      <CategoryForm
        id={FORM_ID}
        defaultValues={defaultValues}
        onSubmit={handleUpdateCategory}
      />
    </SheetSidebar>
  );
};
