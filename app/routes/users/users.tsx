import { SidebarInset } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { Table } from "~/routes/users/components/table";

export function UsersPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Users" />
      <div className="m-6">
        <Table />
      </div>
    </SidebarInset>
  );
}
