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
      margin: depth == 0 ? 0 : layer.style.marginY, //change here margin x aur y kiya hai
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
          <Input id={layer.style.id} type="file" />
        </LabelInputContainer>
      );
    } else if (layer.type === "input-otp") {
      const numberOfGroups = Math.ceil(
        (layer.style.otpBox ?? 6) /
          (layer.style.optSepratorGap
            ? layer.style.optSepratorGap > 0
              ? layer.style.optSepratorGap
              : 1
            : 1)
      );

      let lastSlot = (layer.style.otpBox ?? 6) % numberOfGroups;
      if (lastSlot === 0) lastSlot = layer.style.optSepratorGap ?? 2;

      return (
        <LabelInputContainer key={layer.id}>
          <Label htmlFor={layer.style.id}>{layer.style.label}</Label>
          <InputOTP maxLength={layer.style.otpBox ?? 6}>
            {Array.from({
              length: numberOfGroups,
            }).map((_, index1) => {
              return (
                <div key={index1} className="flex justify-center items-center">
                  <InputOTPGroup>
                    {Array.from({
                      length:
                        index1 === numberOfGroups - 1
                          ? lastSlot
                          : layer.style.optSepratorGap ?? 2,
                    }).map((_, index2) => {
                      return (
                        <InputOTPSlot
                          index={
                            index1 * (layer.style.optSepratorGap ?? 2) + index2
                          }
                          key={
                            index1 * (layer.style.optSepratorGap ?? 2) + index2
                          }
                        />
                      );
                    })}
                  </InputOTPGroup>
                  {index1 <
                    Math.ceil(
                      (layer.style.otpBox ?? 6) /
                        (layer.style.optSepratorGap ?? 2)
                    ) -
                      1 && <InputOTPSeparator />}
                </div>
              );
            })}
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
          <RadioGroup defaultValue="comfortable" className={`${layer.isToggled && "flex flex-wrap gap-8"}`}>
            {Array.from({ length: layer.style.radioOptions ?? 3 }).map(
              (_, index) => {
                return (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={index.toString()}
                      id={`radio-${index}`}
                    />
                    <Label htmlFor="r1">
                      {layer.style.radioOptionsName
                        ? layer.style.radioOptionsName[index]
                        : `Option ${index + 1}`}
                    </Label>
                  </div>
                );
              }
            )}
          </RadioGroup>
        </LabelInputContainer>
      );
    } else return <div key={layer.id}>{layer.id}</div>;
  });
};

export default RenderLayers;
