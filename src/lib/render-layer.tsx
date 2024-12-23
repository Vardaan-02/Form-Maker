"use client";

import { LayerPopUp } from "@/components/layer-pop-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { addLayer } from "@/store/slices/sidebar-slice";
import { Layer } from "@/types/Layer";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const RenderLayers = (
  layers: Layer[],
  depth: number = 0,
  dispatch: Dispatch<UnknownAction>
): JSX.Element[] => {
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

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const inputType = e.dataTransfer.getData("inputType");
      console.log(`Dropped ${inputType} into layer ${layer.id}`);
      dispatch(addLayer({ parentId: layer.id, type: inputType }));
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    if (layer.type === "div")
      return (
        <div
          key={layer.id}
          className={`${
            layer.isToggled ? "flex-row" : "flex-col"
          } flex relative border group`}
          style={combinedStyle}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <LayerPopUp key={layer.id} layerId={layer.id} />
          {layer.children.length > 0 && RenderLayers(layer.children, depth + 1,dispatch)}
        </div>
      );
    else if (layer.type === "text-input")
      return (
        <LabelInputContainer className="cursor-pointer" key={layer.id}>
          <Label htmlFor="text-input">
            Label
          </Label>
          <Input
            id="text-input"
            placeholder="Text Input"
            type="text"
          />
        </LabelInputContainer>
      );
    else if (layer.type === "button") {
      return (
        <Button key={layer.id} className={`cursor-pointer`}>
          Submit
        </Button>
      );
    } else return <div key={layer.id}>{layer.id}</div>;
  });
};

export default RenderLayers;
