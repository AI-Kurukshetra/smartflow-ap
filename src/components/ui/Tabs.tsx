import clsx from "clsx";
import React from "react";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              className={clsx(
                "rounded-2xl px-4 py-2 text-sm font-medium transition",
                active
                  ? "bg-teal-500 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-teal-200"
              )}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>{tabs.find((tab) => tab.id === activeId)?.content}</div>
    </div>
  );
}
