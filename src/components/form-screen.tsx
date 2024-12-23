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
      const combinedStyle: React.CSSProperties = {
        justifyContent: layer.style.justifyContent,
        alignItems: layer.style.alignItems,
        padding: layer.style.padding,
        margin: depth == 0 ? 0 : layer.style.margin,
        opacity: layer.style.opacity,
        backgroundColor: layer.style.backgroundColor,
        borderRadius: layer.style.borderRadius,
        borderWidth: layer.style.borderWidth,
        borderColor: layer.style.borderColor,
        gap: layer.style.gap,
        width: layer.style.width,
        height: layer.style.height,
      };

      return (
        <div
          key={layer.id}
          className={`${
            layer.isToggled ? "flex-row" : "flex-col"
          } shadow-xl px-4 py-2 flex gap-4 rounded-md h-full w-full relative border group`}
          style={combinedStyle}
        >
          <LayerPopUp key={layer.id} layerId={layer.id} />
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
