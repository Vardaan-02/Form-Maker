import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Settings } from "lucide-react";
import { Layer } from "../types/Layer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function LayerPopUp({ layerId }: { layerId: string }) {
  const { layer } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  const [editedLayer, setEditedLayer] = useState<Layer>({ ...layer });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLayer((prev) => ({
      ...prev,
      style: { ...prev.style, [name]: value },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedLayer((prev) => ({
      ...prev,
      style: { ...prev.style, [name]: value },
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setEditedLayer((prev) => ({
      ...prev,
      style: { ...prev.style, [name]: value[0] },
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEditedLayer((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    onUpdate(editedLayer);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute -right-5 -top-5 hover:bg-secondary transition-all p-2 rounded-full opacity-0 group-hover:opacity-100">
          <Settings className="h-6 w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Layer</DialogTitle>
          <DialogDescription>
            Make changes to your layer here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Properties</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={editedLayer.name}
                onChange={(e) =>
                  setEditedLayer((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isToggled"
                checked={editedLayer.isToggled}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isToggled", checked)
                }
              />
              <Label htmlFor="isToggled">Toggled</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depth">Depth</Label>
              <Input
                id="depth"
                name="depth"
                type="number"
                value={editedLayer.depth}
                onChange={(e) =>
                  setEditedLayer((prev) => ({
                    ...prev,
                    depth: parseInt(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Styles</h3>
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("direction", value)
                }
                defaultValue={editedLayer.style.direction}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="justifyContent">Justify Content</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("justifyContent", value)
                }
                defaultValue={editedLayer.style.justifyContent}
              >
                <SelectTrigger>
                  <SelectValue />
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
            <div className="space-y-2">
              <Label htmlFor="alignItems">Align Items</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("alignItems", value)
                }
                defaultValue={editedLayer.style.alignItems}
              >
                <SelectTrigger>
                  <SelectValue />
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
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                name="padding"
                value={editedLayer.style.padding}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                name="margin"
                value={editedLayer.style.margin}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                name="backgroundColor"
                value={editedLayer.style.backgroundColor}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderRadius">Border Radius</Label>
              <Input
                id="borderRadius"
                name="borderRadius"
                value={editedLayer.style.borderRadius}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderWidth">Border Width</Label>
              <Input
                id="borderWidth"
                name="borderWidth"
                value={editedLayer.style.borderWidth}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borderColor">Border Color</Label>
              <Input
                id="borderColor"
                name="borderColor"
                value={editedLayer.style.borderColor}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boxShadow">Box Shadow</Label>
              <Input
                id="boxShadow"
                name="boxShadow"
                value={editedLayer.style.boxShadow}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opacity">Opacity</Label>
              <Slider
                id="opacity"
                min={0}
                max={1}
                step={0.01}
                value={[editedLayer.style.opacity]}
                onValueChange={(value) => handleSliderChange("opacity", value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
