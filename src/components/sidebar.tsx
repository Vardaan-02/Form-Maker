"use client";

import React from "react";
import { motion, PanInfo } from "framer-motion";
import { LayerItem } from "./layer-item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addLayer,
  moveLayer,
  removeLayer,
  setSidebarWidth,
  toggleLayer,
  updateLayerName,
} from "@/store/slices/sidebar-slice";

export default function Sidebar() {
  const { layers, sidebarWidth } = useSelector(
    (state: RootState) => state.sidebar
  );

  const dispatch = useDispatch();

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const newWidth = sidebarWidth + info.delta.x;

    if (newWidth >= 500 && newWidth <= 700) {
      dispatch(setSidebarWidth({ width: newWidth }));
    }
  };

  return (
    <motion.div
      className="fixed left-0 top-0 h-full bg-white shadow-lg"
      style={{ width: sidebarWidth }} // Directly use width here
    >
      <motion.div
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-gray-200"
        drag="x"
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
      />
      <div className="h-full overflow-y-auto p-4">
        <h2 className="mb-4 text-xl font-bold">Layers</h2>
        {layers.map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            onAddLayer={(parentId: string) => dispatch(addLayer({ parentId }))}
            onRemoveLayer={(id) => dispatch(removeLayer({ id }))}
            onUpdateName={(id, name) => dispatch(updateLayerName({ id, name }))}
            onToggle={(id) => dispatch(toggleLayer({ id }))}
            onMove={(id, direction) => dispatch(moveLayer({ id, direction }))}
          />
        ))}
      </div>
    </motion.div>
  );
}
