"use client";

import { useDebugger } from "@/hooks/use-debugger";
import { RootState } from "@/store/store";
import { Layer } from "@/types/Layer";
import { useSelector } from "react-redux";
import { LayerPopUp } from "./layer-pop-up";

export default function FormScreen() {
  const { layers, sidebarWidth } = useSelector(
    (state: RootState) => state.sidebar
  );

  useDebugger<Layer[]>(layers);

  const renderLayers = (layers: Layer[], depth: number = 0): JSX.Element[] => {
    return layers.map((layer) => {
      const backgroundColor = `rgb(${255 - depth * 30}, ${255 - depth * 30}, ${
        255 - depth * 30
      })`;

      return (
        <div
          key={layer.id}
          className={`${
            layer.isToggled ? "flex-row" : "flex-col"
          } shadow-xl px-4 py-2 flex gap-4 rounded-md h-full w-full relative border group`}
          style={{ backgroundColor }}
        >
          <LayerPopUp layerId={layer.id}/>
          {layer.children.length > 0 && renderLayers(layer.children, depth + 1)}
        </div>
      );
    });
  };

  return (
    <div
      className="flex flex-col  p-12"
      style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
    >
      {renderLayers(layers)}
    </div>
  );
}
