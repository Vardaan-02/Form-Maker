"use client";

import { useDispatch } from "react-redux";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import ColorPicker from "./ui/color-picker/color-picker";
import { Layer } from "@/types/Layer";
import { updateLayerStyle } from "@/store/slices/sidebar-slice";
import UnitPopUp from "./unit-pop-up";

export function LayerPopUp({ layer }: { layer: Layer }) {
  const dispatch = useDispatch();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" hover:bg-secondary transition-all p-2 rounded-full ">
          <Settings className="h-6 w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Layer Style</DialogTitle>
          <DialogDescription>
            Make changes to your Layer style here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-12 py-4">
          <div className="space-y-8">
            {/* Left side inputs */}
            {(layer.type === "div" || layer.type === "radio-input") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="justifyContent" className="text-right">
                  Justify Content
                </Label>
                <Select
                  value={layer.style.justifyContent}
                  onValueChange={(value: "center") =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: { ...layer.style, justifyContent: value },
                      })
                    )
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select justify content" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="space-between">Space Between</SelectItem>
                    <SelectItem value="space-around">Space Around</SelectItem>
                    <SelectItem value="space-evenly">Space Evenly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {(layer.type === "div" || layer.type === "radio-input") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="alignItems" className="text-right">
                  Align Items
                </Label>
                <Select
                  onValueChange={(value: "center") =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: { ...layer.style, alignItems: value },
                      })
                    )
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select align items" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex-start">Flex Start</SelectItem>
                    <SelectItem value="flex-end">Flex End</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {layer.type === "input-otp" && (
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="NumberOfOTPBox"
                  className="text-right flex justify-center items-center"
                >
                  Number of OTP Box
                </Label>
                <Input
                  type="number"
                  value={layer.style.otpBox}
                  className="w-full"
                  onChange={(e) =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: {
                          ...layer.style,
                          otpBox:
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value),
                        },
                      })
                    )
                  }
                />
              </div>
            )}
            {layer.type === "input-otp" && (
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="OTPSepratorGap"
                  className="text-right flex justify-center items-center"
                >
                  OTP Seprator Gap
                </Label>
                <Input
                  type="number"
                  value={layer.style.optSepratorGap}
                  className="w-full"
                  onChange={(e) =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: {
                          ...layer.style,
                          optSepratorGap:
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value),
                        },
                      })
                    )
                  }
                />
              </div>
            )}
            {layer.type === "radio-input" && (
              <div className="gap-4 grid grid-cols-4">
                <Label
                  htmlFor="noOfRadioOptions"
                  className="text-right flex justify-center items-center"
                >
                  Number of Radio Options
                </Label>
                <div className="col-span-3">
                  <Input
                    type="number"
                    value={layer.style.radioOptions}
                    className="w-full"
                    onChange={(e) =>
                      dispatch(
                        updateLayerStyle({
                          layerId: layer.id,
                          style: {
                            ...layer.style,
                            radioOptions:
                              e.target.value === ""
                                ? 0
                                : parseInt(e.target.value) > 8
                                ? 8
                                : parseInt(e.target.value),
                          },
                        })
                      )
                    }
                  />
                </div>
              </div>
            )}
            {layer.type === "radio-input" &&
              layer.style.radioOptions &&
              Array.from({ length: Math.min(layer.style.radioOptions, 4) }).map(
                (_, index) => {
                  return (
                    <div className="gap-4 grid grid-cols-4" key={index}>
                      <Label
                        htmlFor={`name-option-${index}`}
                        className="text-right flex justify-center items-center"
                      >
                        Option {index + 1} Name
                      </Label>
                      <div className="col-span-3">
                        <Input
                          type="text"
                          value={layer.style.radioOptionsName![index]}
                          className="w-full"
                          onChange={(e) =>
                            dispatch(
                              updateLayerStyle({
                                layerId: layer.id,
                                style: {
                                  ...layer.style,
                                  radioOptionsName:
                                    layer.style.radioOptionsName!.map(
                                      (ele, i) => {
                                        if (i === index)
                                          return e.currentTarget.value;
                                        return ele;
                                      }
                                    ),
                                },
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                }
              )}
            {layer.type === "text-input" && (
              <div className="flex items-center gap-4">
                <Label htmlFor="backgroundColor" className="text-right">
                  Placeholder
                </Label>
                <Input
                  value={layer.style.placeholder}
                  className="w-full"
                  onChange={(e) =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: { ...layer.style, placeholder: e.target.value },
                      })
                    )
                  }
                />
              </div>
            )}
            {layer.type === "div" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="backgroundColor" className="text-right">
                  Background Color
                </Label>
                <ColorPicker
                  _color={layer.style.backgroundColor}
                  onChange={(color) =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: { ...layer.style, backgroundColor: color },
                      })
                    )
                  }
                />
              </div>
            )}
            {layer.type === "div" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="borderColor" className="text-right">
                  Border Color
                </Label>
                <ColorPicker
                  _color={layer.style.borderColor}
                  onChange={(color) =>
                    dispatch(
                      updateLayerStyle({
                        layerId: layer.id,
                        style: { ...layer.style, borderColor: color },
                      })
                    )
                  }
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opacity" className="text-right">
                Opacity
              </Label>
              <Slider
                id="opacity"
                min={0}
                max={1}
                step={0.01}
                value={[(layer.style.opacity as number) || 1]}
                onValueChange={([value]) =>
                  dispatch(
                    updateLayerStyle({
                      layerId: layer.id,
                      style: { ...layer.style, opacity: value },
                    })
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <div className="space-y-4">
            {(layer.type === "div" || layer.type === "radio-input") && (
              <UnitPopUp name="Gap" layer={layer} prop={layer.style.gap} />
            )}
            {layer.type === "div" && (
              <UnitPopUp
                name="Padding"
                layer={layer}
                prop={layer.style.padding}
              />
            )}
            {
              <UnitPopUp
                name="Margin-Y"
                layer={layer}
                prop={layer.style.marginY}
              />
            }
            {
              <UnitPopUp
                name="Margin-X"
                layer={layer}
                prop={layer.style.marginX}
              />
            }
            {layer.type === "div" && (
              <UnitPopUp
                name="Border Radius"
                layer={layer}
                prop={layer.style.borderRadius}
              />
            )}
            {layer.type === "div" && (
              <UnitPopUp
                name="Border Width"
                layer={layer}
                prop={layer.style.borderWidth}
              />
            )}
            <UnitPopUp name="Height" layer={layer} prop={layer.style.height} />
            <UnitPopUp name="Width" layer={layer} prop={layer.style.width} />
            {layer.type === "radio-input" &&
              layer.style.radioOptions &&
              Array.from({ length: layer.style.radioOptions - 4 }).map(
                (_, index) => {
                  return (
                    <div className="gap-4 grid grid-cols-4" key={index}>
                      <Label
                        htmlFor={`name-option-${index + 4}`}
                        className="text-right flex justify-center items-center"
                      >
                        Option {index + 5} Name
                      </Label>
                      <div className="col-span-3">
                        <Input
                          type="text"
                          value={layer.style.radioOptionsName![index + 4]}
                          className="w-full"
                          onChange={(e) =>
                            dispatch(
                              updateLayerStyle({
                                layerId: layer.id,
                                style: {
                                  ...layer.style,
                                  radioOptionsName:
                                    layer.style.radioOptionsName!.map(
                                      (ele, i) => {
                                        if (i === index + 4)
                                          return e.currentTarget.value;
                                        return ele;
                                      }
                                    ),
                                },
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
              Save changes
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
