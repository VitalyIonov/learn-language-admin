import React from "react";
import type { IssueOut, IssueUpdate } from "~/types/api";

import { SheetSidebar } from "~/components/sheet-sidebar";
import { useUpdateIssue } from "~/hooks/api/useUpdateIssue";
import { useLoadIssue } from "~/hooks/api/useLoadIssue";
import { IssueForm } from "../issue-form";

type Props = {
  id: IssueOut["id"] | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const UpdateIssueSheet = ({
  id,
  isOpen,
  onOpenChange,
  onSuccess,
}: Props) => {
  const { updateIssue, isPending } = useUpdateIssue({ id });
  const { issue, invalidate: invalidateIssue } = useLoadIssue(
    { id },
    { enabled: Boolean(id), gcTime: 0 },
  );

  const handleUpdateIssue = async (data: Partial<IssueUpdate>) => {
    await updateIssue(data, {
      onSuccess: () => {
        onSuccess?.();
        invalidateIssue();
      },
    });
  };

  if (!issue) {
    return null;
  }

  const defaultValues: Partial<IssueUpdate> = {
    statusId: issue.status?.id,
    decision: issue.decision,
  };

  return (
    <SheetSidebar
      isOpen={isOpen}
      title={"Обращение"}
      onOpenChange={onOpenChange}
    >
      <IssueForm
        defaultValues={defaultValues}
        onSubmit={handleUpdateIssue}
        isLoading={isPending}
      />
    </SheetSidebar>
  );
};
