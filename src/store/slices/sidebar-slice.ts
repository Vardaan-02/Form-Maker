import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { LayerStyle } from "@/types/Layer";
import { SidebarState } from "@/types/Sidebar";
import { hslToHex } from "@/lib/color-conversion";
import { addToChildren } from "./sidebar-slice/add-to-children";
import { removeFromChildren } from "./sidebar-slice/remove-from-children";
import { toggleInChildren } from "./sidebar-slice/toggle-layer";
import { updateInChildren } from "./sidebar-slice/update-in-children";
import { moveInChildren } from "./sidebar-slice/move-layer";
import { updateLayerStyleInChildren } from "./sidebar-slice/update-layer-style-in-children";

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
        padding: "2rem",
        margin: "0rem",
        opacity: 1,
        backgroundColor: `${hslToHex(0, 0, 100)}`,
        borderRadius: "0px",
        borderWidth: "1px",
        borderColor: "#dddddd",
        gap: "1rem",
        height: "100%",
        width: "100%",
        placeholder: "placeholder",
        label: "Label",
        id: nanoid(),
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
      state.layers = addToChildren(state.layers, action);
    },
    removeLayer: (state, action: PayloadAction<{ id: string }>) => {
      state.layers = removeFromChildren(state.layers, action);
    },
    updateLayerName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.layers = updateInChildren(state.layers, action);
    },
    toggleLayer: (state, action: PayloadAction<{ id: string }>) => {
      state.layers = toggleInChildren(state.layers, action);
    },
    moveLayer: (
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>
    ) => {
      state.layers = moveInChildren(state.layers, action);
    },
    setSidebarWidth: (state, action: PayloadAction<{ width: number }>) => {
      state.sidebarWidth = action.payload.width;
    },
    updateLayerStyle: (
      state,
      action: PayloadAction<{ layerId: string; style: LayerStyle }>
    ) => {
      state.layers = updateLayerStyleInChildren(state.layers, action);
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