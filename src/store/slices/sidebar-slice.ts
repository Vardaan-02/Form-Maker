import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Layer, LayerStyle } from "@/types/Layer";
import { SidebarState } from "@/types/Sidebar";
import { hslToHex } from "@/lib/color-conversion";

const initialState: SidebarState = {
  layers: [
    {
      type: "div",
      id: "1",
      name: "Root Layer",
      isToggled: false,
      children: [],
      style: {
        justifyContent: "center",
        alignItems: "center",
        padding: "0rem",
        margin: "0rem",
        opacity: 1,
        backgroundColor: `${hslToHex(0, 0, 100)}`,
        borderRadius: "0px",
        borderWidth: "1px",
        borderColor: "#dddddd",
        gap: "0rem",
        height: "100%",
        width: "100%",
      },
      depth: 1,
    },
  ],
  sidebarWidth: 500,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    addLayer: (
      state,
      action: PayloadAction<{ parentId: string; type: string }>
    ) => {
      const addToChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === action.payload.parentId) {
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
              },
              depth: layer.depth + 1,
            });
          } else if (layer.children.length > 0) {
            layer.children = addToChildren(layer.children);
          }
          return layer;
        });
      };

      state.layers = addToChildren(state.layers);
    },
    removeLayer: (state, action: PayloadAction<{ id: string }>) => {
      const removeFromChildren = (layers: Layer[]): Layer[] => {
        return layers
          .map((layer) => {
            if (layer.children.length > 0) {
              layer.children = removeFromChildren(layer.children);
            }
            return layer;
          })
          .filter((layer) => layer.id !== action.payload.id);
      };

      state.layers = removeFromChildren(state.layers);
    },
    updateLayerName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const updateInChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === action.payload.id) {
            layer.name = action.payload.name || "Untitled Layer";
          } else if (layer.children.length > 0) {
            layer.children = updateInChildren(layer.children);
          }
          return layer;
        });
      };

      state.layers = updateInChildren(state.layers);
    },
    toggleLayer: (state, action: PayloadAction<{ id: string }>) => {
      const toggleInChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === action.payload.id) {
            layer.isToggled = !layer.isToggled;
          } else if (layer.children.length > 0) {
            layer.children = toggleInChildren(layer.children);
          }
          return layer;
        });
      };

      state.layers = toggleInChildren(state.layers);
    },
    moveLayer: (
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>
    ) => {
      const moveInChildren = (layers: Layer[]): Layer[] => {
        const index = layers.findIndex(
          (layer) => layer.id === action.payload.id
        );
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
            layer.children = moveInChildren(layer.children);
          }
          return layer;
        });
      };

      state.layers = moveInChildren(state.layers);
    },
    setSidebarWidth: (state, action: PayloadAction<{ width: number }>) => {
      state.sidebarWidth = action.payload.width;
    },
    updateLayerStyle: (
      state,
      action: PayloadAction<{ layerId: string; style: LayerStyle }>
    ) => {
      const updateLayerStyleInChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === action.payload.layerId) {
            layer.style = action.payload.style;
          } else if (layer.children.length > 0) {
            layer.children = updateLayerStyleInChildren(layer.children);
          }
          return layer;
        });
      };

      state.layers = updateLayerStyleInChildren(state.layers);
    },
  },
});

export const {
  addLayer,
  removeLayer,
  updateLayerName,
  toggleLayer,
  moveLayer,
  setSidebarWidth,
  updateLayerStyle,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
