"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  Edit2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LayerItemProps } from "@/types/Layer";
import { LayerPopUp } from "./layer-pop-up";
import { useDispatch } from "react-redux";
import {
  addLayer,
  moveLayer,
  removeLayer,
  toggleLayer,
  updateLayerName,
  updateLayerStyle,
} from "@/store/slices/sidebar-slice";

export function LayerItem({ layer }: LayerItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLayerName({ id: layer.id, name: e.target.value }));
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateLayerStyle({
        layerId: layer.id,
        style: { ...layer.style, label: e.target.value },
      })
    );
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameBlur();
    }
  };

  return (
    <div>
      <div
        className="group mb-2 flex items-center"
        style={{ marginLeft: `${layer.depth * 20}px` }}
      >
        {layer.children.length > 0 && (
          <button onClick={handleToggleExpand} className="mr-2">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}
        {isEditing ? (
          <Input
            value={
              layer.type === "div"
                ? layer.name
                : layer.type === "text-input"
                ? layer.style.label
                : layer.type === "button"
                ? layer.style.label
                : ""
            }
            onChange={
              layer.type === "div" ? handleNameChange : handleLabelChange
            }
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="mr-2 w-40"
            autoFocus
          />
        ) : (
          <span className="mr-2 w-40 truncate">
            {layer.type === "div"
              ? layer.name
              : layer.type === "text-input"
              ? layer.style.label
              : layer.type === "button"
              ? layer.style.label
              : ""}
          </span>
        )}

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              dispatch(addLayer({ parentId: layer.id, type: "div" }))
            }
            title="Add sub-layer"
          >
            <Plus size={16} />
          </Button>
          {layer.depth > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(removeLayer({ id: layer.id }))}
              title="Remove layer"
            >
              <Minus size={16} />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleNameClick}
            title="Rename layer"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              dispatch(moveLayer({ id: layer.id, direction: "up" }))
            }
            title="Move up"
          >
            <ArrowUp size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() =>
              dispatch(moveLayer({ id: layer.id, direction: "down" }))
            }
            title="Move down"
          >
            <ArrowDown size={16} />
          </Button>
          {layer.type === "div" && (
            <Switch
              checked={layer.isToggled}
              onCheckedChange={() => dispatch(toggleLayer({ id: layer.id }))}
              title="Toggle layer"
            />
          )}
          <LayerPopUp key={layer.id} layer={layer} />
        </div>
      </div>
      {isExpanded && layer.children.length > 0 && (
        <div>
          {layer.children.map((childLayer) => (
            <LayerItem key={childLayer.id} layer={childLayer} />
          ))}
        </div>
      )}
    </div>
  );
}
