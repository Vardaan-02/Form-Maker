"use client";

import React from "react";
import { motion, PanInfo } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setSidebarWidth } from "@/store/slices/sidebar-slice";
import DraggableComponent from "./draggable-component";
import LayerManager from "./layer-manager";

export default function Sidebar() {
  const { sidebarWidth } = useSelector((state: RootState) => state.sidebar);

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
      style={{ width: sidebarWidth }}
    >
      <motion.div
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-gray-200"
        drag="x"
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
      />
      <Tabs defaultValue="layout" className="h-[95%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="input">Input(s)</TabsTrigger>
        </TabsList>
        <TabsContent value="layout" className="h-full"><LayerManager /></TabsContent>
        <TabsContent value="input">
          <DraggableComponent />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
