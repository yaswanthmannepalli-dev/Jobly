import { getCategories } from "@/app/actions/categories";
import CategoriesClient from "./CategoriesClient";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Categories</h1>
      </div>
      <CategoriesClient categories={categories} />
    </div>
  );
}
