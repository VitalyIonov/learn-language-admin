import { SidebarInset } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { CategoriesTable } from './components/categories-table';

export function CategoriesPage() {
  return (
    <SidebarInset>
      <SiteHeader title="Categories" />
      <div className="m-6">
        <CategoriesTable />
      </div>
    </SidebarInset>
  );
}
