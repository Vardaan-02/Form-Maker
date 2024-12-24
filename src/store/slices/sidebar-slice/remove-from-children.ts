import { Layer } from "@/types/Layer";
import { PayloadAction } from "@reduxjs/toolkit";

export const removeFromChildren = (
  layers: Layer[],
  action: PayloadAction<{ id: string }>
): Layer[] => {
  return layers
    .map((layer) => {
      if (layer.children.length > 0) {
        layer.children = removeFromChildren(layer.children, action);
      }
      return layer;
    })
    .filter((layer) => layer.id !== action.payload.id);
};
