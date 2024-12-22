export interface Layer {
  id: string;
  name: string;
  isToggled: boolean;
  children: Layer[];
  style: {
    direction?: "row" | "column";
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    borderRadius?: string;
    borderWidth?: string;
    borderColor?: string;
    boxShadow?: string;
    opacity?: number;
  };
  depth: number;
}

export interface LayerItemProps {
  layer: Layer;
  onAddLayer: (parentId: string) => void;
  onRemoveLayer: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onToggle: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  depth?: number;
}
