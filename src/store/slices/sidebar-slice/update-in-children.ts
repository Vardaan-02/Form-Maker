import { Layer } from "@/types/Layer";
import { PayloadAction } from "@reduxjs/toolkit";

export const updateInChildren = (
  layers: Layer[],
  action: PayloadAction<{ id: string; name: string }>
): Layer[] => {
  return layers.map((layer) => {
    if (layer.id === action.payload.id) {
      layer.name = action.payload.name || "Untitled Layer";
    } else if (layer.children.length > 0) {
      layer.children = updateInChildren(layer.children, action);
    }
    return layer;
  });
};
