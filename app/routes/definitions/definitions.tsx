import { SidebarInset } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { DefinitionsTable } from './components/definitions-table';

export function DefinitionsPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Definitions" />
      <div className="m-6">
        <DefinitionsTable />
      </div>
    </SidebarInset>
  );
}
