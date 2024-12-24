import { hslToHex } from "@/lib/color-conversion";
import { Layer } from "@/types/Layer";
import { nanoid, PayloadAction } from "@reduxjs/toolkit";

export const addToChildren = (
  layers: Layer[],
  action: PayloadAction<{ parentId: string; type: string }>
): Layer[] => {
  return layers.map((layer) => {
    if (layer.id === action.payload.parentId) {
      if (action.payload.type === "div") {
        layer.children.push({
          type: action.payload.type,
          id: nanoid(),
          name: "Untitled Layer",
          isToggled: false,
          children: [],
          style: {
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem",
            margin: "0rem",
            opacity: 1,
            backgroundColor: `${hslToHex(0, 0, 100)}`,
            borderRadius: "0rem",
            borderWidth: "1px",
            borderColor: "#dddddd",
            gap: "0rem",
            height: "100%",
            width: "100%",
            placeholder: "placeholder",
          },
          depth: layer.depth + 1,
        });
      } else if (action.payload.type === "text-input") {
        layer.children.push({
          type: action.payload.type,
          id: nanoid(),
          name: "Untitled Layer",
          isToggled: false,
          children: [],
          style: {
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem",
            margin: "0rem",
            opacity: 1,
            backgroundColor: `${hslToHex(0, 0, 100)}`,
            borderRadius: "0rem",
            borderWidth: "1px",
            borderColor: "#dddddd",
            gap: "1rem",
            height: "100%",
            width: "100%",
            placeholder: "placeholder",
            label: "Label",
            id: nanoid(),
          },
          depth: layer.depth + 1,
        });
      } else if (action.payload.type === "button") {
        layer.children.push({
          type: action.payload.type,
          id: nanoid(),
          name: "Untitled Layer",
          isToggled: false,
          children: [],
          style: {
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem",
            margin: "0rem",
            opacity: 1,
            backgroundColor: `${hslToHex(0, 0, 100)}`,
            borderRadius: "0rem",
            borderWidth: "1px",
            borderColor: "#dddddd",
            gap: "0rem",
            height: "100%",
            width: "100%",
            placeholder: "placeholder",
            label: "Submit",
            id: nanoid(),
          },
          depth: layer.depth + 1,
        });
      } else {
        layer.children.push({
          type: action.payload.type,
          id: nanoid(),
          name: "Untitled Layer",
          isToggled: false,
          children: [],
          style: {
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem",
            margin: "0rem",
            opacity: 1,
            backgroundColor: `${hslToHex(0, 0, 100)}`,
            borderRadius: "0rem",
            borderWidth: "1px",
            borderColor: "#dddddd",
            gap: "0rem",
            height: "100%",
            width: "100%",
            placeholder: "placeholder",
            label: "Mera Yasu",
            id: nanoid(),
          },
          depth: layer.depth + 1,
        });
      }
    } else if (layer.children.length > 0) {
      layer.children = addToChildren(layer.children, action);
    }
    return layer;
  });
};
