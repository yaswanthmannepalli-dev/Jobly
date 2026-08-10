"use client";

import { useState } from "react";
import { Plus, Trash2, Code2, PenTool, Megaphone, BarChart3, Handshake, LifeBuoy } from "lucide-react";
import { addCategory, deleteCategory } from "@/app/actions/categories";

const ICONS = [
  { name: "code", icon: Code2 },
  { name: "pen", icon: PenTool },
  { name: "megaphone", icon: Megaphone },
  { name: "chart", icon: BarChart3 },
  { name: "handshake", icon: Handshake },
  { name: "life-buoy", icon: LifeBuoy }
];

export default function CategoriesClient({ categories }: { categories: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", icon: "code" });
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name) {
      setError("Name is required");
      return;
    }
    const res = await addCategory(newCat.name, newCat.icon);
    if (res.error) {
      setError(res.error);
    } else {
      setNewCat({ name: "", icon: "code" });
      setIsAdding(false);
      setError("");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 rounded-xl bg-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple-dark transition"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-line shadow-sm flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Add New Category</h3>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                value={newCat.name} 
                onChange={e => setNewCat({...newCat, name: e.target.value})} 
                placeholder="e.g., Engineering"
                className="w-full px-4 py-2 border border-line rounded-lg bg-surface/50 focus:bg-white focus:outline-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <div className="flex items-center gap-2">
                {ICONS.map(i => {
                  const Icon = i.icon;
                  return (
                    <button
                      key={i.name}
                      type="button"
                      onClick={() => setNewCat({...newCat, icon: i.name})}
                      className={`p-2 rounded-xl border ${newCat.icon === i.name ? 'border-purple bg-purple-tint text-purple' : 'border-line bg-surface text-muted'} transition`}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-purple text-white rounded-xl text-sm font-medium hover:bg-purple-dark transition"
            >
              Save
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <p className="text-muted col-span-full">No categories found. Add one to get started.</p>
        ) : (
          categories.map(cat => {
            const iconDef = ICONS.find(i => i.name === cat.icon) || ICONS[0];
            const Icon = iconDef.icon;
            
            return (
              <div key={cat.id} className="flex items-center justify-between p-5 bg-white border border-line rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-tint text-purple">
                    <Icon size={20} />
                  </span>
                  <span className="font-medium text-foreground">{cat.name}</span>
                </div>
                <button onClick={() => handleDelete(cat.id)} className="text-muted hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
