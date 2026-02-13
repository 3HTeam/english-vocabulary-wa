import { cn } from "@/utils/shadcn";

import {
  TOOLBAR_GROUPS,
  TOOLBAR_ITEM_KEYS,
  TOOLBAR_PRESETS,
  ToolbarItemKey,
  ToolbarItems,
} from "./constants";

interface ToolbarProps {
  className?: string;
  items?: ToolbarItemKey[];
}

export function Toolbar({
  className,
  items = TOOLBAR_PRESETS.basic,
}: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center !p-1 gap-2 flex-wrap !border-b !border-solid !border-border",
        className,
      )}
    >
      {items.map((itemKey) => {
        const ToolbarComponent = ToolbarItems[itemKey];
        return ToolbarComponent ? <ToolbarComponent key={itemKey} /> : null;
      })}
    </div>
  );
}

export {
  TOOLBAR_ITEM_KEYS,
  TOOLBAR_PRESETS,
  TOOLBAR_GROUPS,
  type ToolbarItemKey,
};
