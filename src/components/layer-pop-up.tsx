"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { RootState } from "@/store/store";
import { updateLayerStyle } from "@/store/slices/sidebar-slice";
import ColorPicker from "./ui/color-picker/color-picker";
import { Layer, LayerStyle } from "@/types/Layer";
import { hslToHex } from "@/lib/color-conversion";

const unitOptions = ["px", "em", "rem", "%", "vw", "vh"];

const defaultStyle: LayerStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: "0rem",
  margin: "0rem",
  opacity: 1,
  backgroundColor: `${hslToHex(0, 0, 90)}`,
  borderRadius: "0rem",
  borderWidth: "0px",
  borderColor: "#000000",
  gap: "0rem",
  height: "100%",
  width: "100%",
};

const findLayerById = (layers: Layer[], layerId: string): Layer | undefined => {
  for (const layer of layers) {
    if (layer.id === layerId) {
      return layer;
    }
    if (layer.children.length > 0) {
      const foundLayer = findLayerById(layer.children, layerId);
      if (foundLayer) return foundLayer;
    }
  }
  return undefined;
};

export function LayerPopUp({ layerId }: { layerId: string }) {
  const dispatch = useDispatch();
  const layer = useSelector((state: RootState) =>
    findLayerById(state.sidebar.layers, layerId)
  );

  const [style, setStyle] = useState<LayerStyle>(layer?.style ?? defaultStyle);
  const [units, setUnits] = useState({
    height: "%",
    width: "%",
    padding: "px",
    margin: "px",
    borderRadius: "px",
    borderWidth: "px",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (layer) {
      setStyle(layer.style);
      const extractedUnits = {
        height: (layer.style.height || "").replace(/^-?\d*\.?\d+/, "") || "px",
        width: (layer.style.width || "").replace(/^-?\d*\.?\d+/, "") || "px",
        padding:
          (layer.style.padding || "").replace(/^-?\d*\.?\d+/, "") || "px",
        margin: (layer.style.margin || "").replace(/^-?\d*\.?\d+/, "") || "px",
        borderRadius:
          (layer.style.borderRadius || "").replace(/^-?\d*\.?\d+/, "") || "px",
        borderWidth:
          (layer.style.borderWidth || "").replace(/^-?\d*\.?\d+/, "") || "px",
      };
      setUnits(extractedUnits);
    }
  }, [layer]);

  const handleStyleChange = (key: string, value: string | number) => {
    const validatedValue = value;
    let error = "";

    if (
      [
        "width",
        "height",
        "padding",
        "margin",
        "borderRadius",
        "borderWidth",
      ].includes(key)
    ) {
      if (validatedValue === "") {
        error = `Invalid ${key}. Please use a number.`;
      }
    }

    setStyle((prevStyle) => ({ ...prevStyle, [key]: validatedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
  };

  const handleUnitChange = (key: string, unit: string) => {
    setUnits((prevUnits) => ({ ...prevUnits, [key]: unit }));
    const numericValue = parseFloat(style[key as keyof typeof style] as string);
    if (!isNaN(numericValue)) {
      handleStyleChange(key, `${numericValue}${unit}`);
    }
  };

  const handleSave = () => {
    if (Object.values(errors).every((error) => error === "")) {
      dispatch(updateLayerStyle({ layerId, style }));
    }
  };

  if (!layer) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute -right-4 -top-4 hover:bg-secondary transition-all p-2 rounded-full opacity-0 group-hover:opacity-100">
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
                value={style.justifyContent as string}
                onValueChange={(value) =>
                  handleStyleChange("justifyContent", value)
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
                value={style.alignItems as string}
                onValueChange={(value) =>
                  handleStyleChange("alignItems", value)
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backgroundColor" className="text-right">
                Background Color
              </Label>
              <ColorPicker
                _color={layer.style.backgroundColor}
                onChange={(color) =>
                  handleStyleChange("backgroundColor", color)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="borderColor" className="text-right">
                Border Color
              </Label>
              <ColorPicker
                _color={layer.style.borderColor}
                onChange={(color) => handleStyleChange("borderColor", color)}
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
                value={[(style.opacity as number) || 1]}
                onValueChange={([value]) => handleStyleChange("opacity", value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* Right side inputs */}
            {[
              "margin",
              "borderRadius",
              "borderWidth",
              "width",
              "height",
              "padding",
            ].map((prop) => (
              <div key={prop} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={prop} className="text-right capitalize">
                  {prop}
                </Label>
                <div className="col-span-2">
                  <Input
                    id={prop}
                    value={
                      (style[prop as keyof typeof style] as string)?.replace(
                        /[^\d.-]/g,
                        ""
                      ) || ""
                    }
                    onChange={(e) => handleStyleChange(prop, e.target.value)}
                    aria-invalid={errors[prop] ? "true" : "false"}
                    aria-describedby={`${prop}-error`}
                  />
                  {errors[prop] && (
                    <p id={`${prop}-error`} className="text-red-500 text-sm">
                      {errors[prop]}
                    </p>
                  )}
                </div>
                <Select
                  value={units[prop as keyof typeof units]}
                  onValueChange={(value) => handleUnitChange(prop, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={Object.values(errors).some((error) => error !== "")}
            >
              Save changes
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
