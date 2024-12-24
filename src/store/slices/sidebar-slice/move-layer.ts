import { Layer } from "@/types/Layer";
import { PayloadAction } from "@reduxjs/toolkit";

export const moveInChildren = (
  layers: Layer[],
  action: PayloadAction<{ id: string; direction: "up" | "down" }>
): Layer[] => {
  const index = layers.findIndex((layer) => layer.id === action.payload.id);
  if (index !== -1) {
    const newIndex =
      action.payload.direction === "up"
        ? Math.max(0, index - 1)
        : Math.min(layers.length - 1, index + 1);
    if (index !== newIndex) {
      const [movedLayer] = layers.splice(index, 1);
      layers.splice(newIndex, 0, movedLayer);
    }
    return [...layers];
  }
  return layers.map((layer) => {
    if (layer.children.length > 0) {
      layer.children = moveInChildren(layer.children, action);
    }
    return layer;
  });
};
