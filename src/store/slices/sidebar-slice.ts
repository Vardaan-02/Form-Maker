import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layer } from "@/types/Layer";
import { SidebarState } from "@/types/Sidebar";

const initialState: SidebarState = {
  layers: [
    {
      id: "1",
      name: "Root Layer",
      isToggled: false,
      children: [],
      style: {
        direction: "column",
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
    addLayer: (state, action: PayloadAction<{ parentId: string }>) => {
      const addToChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === action.payload.parentId) {
            layer.children.push({
              id: layer.id + (layer.children.length + 1),
              name: "Untitled Layer",
              isToggled: false,
              children: [],
              style: {
                direction: "column",
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
  },
});

export const {
  addLayer,
  removeLayer,
  updateLayerName,
  toggleLayer,
  moveLayer,
  setSidebarWidth,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
