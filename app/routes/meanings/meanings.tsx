import { SidebarInset } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { MeaningsTable } from './components/meanings-table';

export function MeaningsPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Meanings" />
      <div className="m-6">
        <MeaningsTable />
      </div>
    </SidebarInset>
  );
}
