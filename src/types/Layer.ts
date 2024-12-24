export interface Layer {
  type: string
  id: string;
  name: string;
  isToggled: boolean;
  children: Layer[];
  depth: number;
  style: LayerStyle;
}

export interface LayerStyle {
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  opacity?: number;
  gap?:string;
  height?:string;
  width?:string;
  placeholder?:string;
  label?:string;
  id?:string;
}

export interface LayerItemProps {
  layer: Layer;
}
