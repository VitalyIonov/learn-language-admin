import { SidebarInset } from "~/components/ui/sidebar";
import { SiteHeader } from "~/components/site-header";
import { LevelsTable } from "./components/levels-table";

export function LevelsPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Levels" />
      <div className="m-6">
        <LevelsTable />
      </div>
    </SidebarInset>
  );
}
