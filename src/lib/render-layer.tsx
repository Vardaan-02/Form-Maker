"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelInputContainer } from "@/components/ui/label";
import { addLayer } from "@/store/slices/sidebar-slice";
import { Layer } from "@/types/Layer";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Combobox } from "@/components/ui/combo-box";

const RenderLayers = (
  layers: Layer[],
  depth: number = 0,
  dispatch: Dispatch<UnknownAction>,
  showBorder: boolean
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
          {layer.children.length > 0 &&
            RenderLayers(layer.children, depth + 1, dispatch, showBorder)}
        </div>
      );
    else if (layer.type === "text-input")
      return (
        <LabelInputContainer key={layer.id}>
          <Label htmlFor={layer.style.id}>{layer.style.label}</Label>
          <Input
            id={layer.style.id}
            placeholder={layer.style.placeholder}
            type="text"
          />
        </LabelInputContainer>
      );
    else if (layer.type === "button") {
      return <Button key={layer.id}>{layer.style.label}</Button>;
    } else if (layer.type === "file-upload") {
      return (
        <LabelInputContainer key={layer.id}>
          <Label htmlFor={layer.style.id}>{layer.style.label}</Label>
          <Input id={layer.style.id} type="file"/>
        </LabelInputContainer>
      );
    } else if (layer.type === "input-otp") {
      return (
        <LabelInputContainer key={layer.id}>
          <Label htmlFor={layer.style.id}>{layer.style.label}</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </LabelInputContainer>
      );
    } else if (layer.type === "combo-box") {
      return (
        <LabelInputContainer key={layer.id}>
          <Label>{layer.style.label}</Label>
          <Combobox setValue={() => {}} />
        </LabelInputContainer>
      );
    } else if (layer.type === "radio-input") {
      return (
        <LabelInputContainer className="cursor-pointer" key={layer.id}>
          <Label htmlFor="file-upload" className="cursor-pointer">
            {layer.style.label}
          </Label>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Option 3</Label>
            </div>
          </RadioGroup>
        </LabelInputContainer>
      );
    } else return <div key={layer.id}>{layer.id}</div>;
  });
};

export default RenderLayers;
