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
            <UnitPopUp name="Gap" layer={layer} prop={layer.style.gap} />
            <UnitPopUp
              name="Padding"
              layer={layer}
              prop={layer.style.padding}
            />
            <UnitPopUp name="Margin" layer={layer} prop={layer.style.margin} />
            <UnitPopUp
              name="Border Radius"
              layer={layer}
              prop={layer.style.borderRadius}
            />
            <UnitPopUp
              name="Border Width"
              layer={layer}
              prop={layer.style.borderWidth}
            />
            <UnitPopUp name="Height" layer={layer} prop={layer.style.height} />
            <UnitPopUp name="Width" layer={layer} prop={layer.style.width} />
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
