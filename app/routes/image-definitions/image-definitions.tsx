import { SidebarInset } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { Table } from "./components/table";

export function ImageDefinitionsPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Definitions" />
      <div className="m-6">
        <Table />
      </div>
    </SidebarInset>
  );
}
