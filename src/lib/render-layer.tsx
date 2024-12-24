"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { addLayer } from "@/store/slices/sidebar-slice";
import { Layer } from "@/types/Layer";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const RenderLayers = (
  layers: Layer[],
  depth: number = 0,
  dispatch: Dispatch<UnknownAction>,
  showBorder: boolean,
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
      borderWidth: showBorder ? layer.style.borderWidth : "0px",
      borderColor: layer.style.borderColor,
      gap: layer.style.gap,
      width: layer.style.width,
      height: layer.style.height,
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const inputType = e.dataTransfer.getData("inputType");
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
          {layer.children.length > 0 && RenderLayers(layer.children, depth + 1,dispatch,showBorder)}
        </div>
      );
    else if (layer.type === "text-input")
      return (
        <LabelInputContainer className="cursor-pointer" key={layer.id}>
          <Label htmlFor={layer.style.id}>
            {layer.style.label}
          </Label>
          <Input
            id={layer.style.id}
            placeholder={layer.style.placeholder}
            type="text"
          />
        </LabelInputContainer>
      );
    else if (layer.type === "button") {
      return (
        <Button key={layer.id} className={`cursor-pointer`}>
          {layer.style.label}
        </Button>
      );
    } else return <div key={layer.id}>{layer.id}</div>;
  });
};

export default RenderLayers;
