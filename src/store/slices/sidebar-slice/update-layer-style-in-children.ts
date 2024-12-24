import { Layer, LayerStyle } from "@/types/Layer";
import { PayloadAction } from "@reduxjs/toolkit";

export const updateLayerStyleInChildren = (
  layers: Layer[],
  action: PayloadAction<{ layerId: string; style: LayerStyle }>
): Layer[] => {
  return layers.map((layer) => {
    if (layer.id === action.payload.layerId) {
      layer.style = action.payload.style;
    } else if (layer.children.length > 0) {
      layer.children = updateLayerStyleInChildren(layer.children, action);
    }
    return layer;
  });
};
