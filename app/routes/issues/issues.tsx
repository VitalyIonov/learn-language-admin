import { SidebarInset } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { IssuesTable } from "./components/issues-table";

export function IssuesPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Issues" />
      <div className="m-6">
        <IssuesTable />
      </div>
    </SidebarInset>
  );
}
