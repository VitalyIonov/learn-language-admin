import { useState } from "react";
import { SingleSelect } from "~/components/single-select";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

import { useLoadIssueStatuses } from "~/hooks/api/useLoadIssueStatuses";
import type { IssueUpdate } from "~/types/api";

type Props = {
  defaultValues?: Pick<IssueUpdate, "statusId" | "decision">;
  onSubmit: (data: Partial<IssueUpdate>) => void;
  isLoading?: boolean;
};

export function IssueForm({ defaultValues, onSubmit, isLoading }: Props) {
  const [decision, setDecision] = useState(defaultValues?.decision);
  const { issueStatuses } = useLoadIssueStatuses();

  const handleUpdateDecision = () => {
    onSubmit({ decision });
  };

  const handleUpdateIssueStatus = (id: number | null) => {
    if (id) {
      onSubmit({ statusId: id });
    }
  };

  console.log(defaultValues);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-2">
        <p>Статус</p>
        <SingleSelect
          value={defaultValues?.statusId || undefined}
          options={issueStatuses}
          disabled={isLoading}
          labelKey="name"
          onChange={handleUpdateIssueStatus}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <p>Решение</p>
        <Textarea
          className="min-h-[100px] w-full"
          value={decision || undefined}
          onChange={(e) => setDecision(e.target.value)}
        />
        <Button
          className="mt-2"
          onClick={handleUpdateDecision}
          disabled={isLoading}
        >
          Обновить решение
        </Button>
      </div>
    </div>
  );
}
