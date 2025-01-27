import { FilteredResourcesScreen } from "@homefront/app/features/resources/FilteredResourcesScreen";

export const dynamic = "force-dynamic";

export default function SavedResourcesPage() {
  return <FilteredResourcesScreen filter="saved" />;
}
