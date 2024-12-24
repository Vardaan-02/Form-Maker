import { Layer } from "@/types/Layer";
import { PayloadAction } from "@reduxjs/toolkit";

export const toggleInChildren = (layers: Layer[],action: PayloadAction<{ id: string }>): Layer[] => {
    return layers.map((layer) => {
      if (layer.id === action.payload.id) {
        layer.isToggled = !layer.isToggled;
      } else if (layer.children.length > 0) {
        layer.children = toggleInChildren(layer.children,action);
      }
      return layer;
    });
  };