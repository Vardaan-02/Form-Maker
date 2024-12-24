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

export function LayerItem({
  layer,
  onAddLayer,
  onRemoveLayer,
  onUpdateName,
  onToggle,
  onMove,
  depth = 0,
}: LayerItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(layer.name);

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    onUpdateName(layer.id, editedName);
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
        style={{ marginLeft: `${depth * 20}px` }}
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
                ? editedName
                : layer.type === "text-input"
                ? layer.style.label
                : layer.type === "button"
                ? layer.style.label
                : ""
            }
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className="mr-2 w-40"
            autoFocus
          />
        ) : (
          <span className="mr-2 w-40 truncate">
            {layer.type === "div"
              ? editedName
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
            onClick={() => onAddLayer(layer.id)}
            title="Add sub-layer"
          >
            <Plus size={16} />
          </Button>
          {depth > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onRemoveLayer(layer.id)}
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
            onClick={() => onMove(layer.id, "up")}
            title="Move up"
          >
            <ArrowUp size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onMove(layer.id, "down")}
            title="Move down"
          >
            <ArrowDown size={16} />
          </Button>
          {layer.type === "div" && (
            <Switch
              checked={layer.isToggled}
              onCheckedChange={() => onToggle(layer.id)}
              title="Toggle layer"
            />
          )}
          <LayerPopUp key={layer.id} layerId={layer.id} />
        </div>
      </div>
      {isExpanded && layer.children.length > 0 && (
        <div>
          {layer.children.map((childLayer) => (
            <LayerItem
              key={childLayer.id}
              layer={childLayer}
              onAddLayer={onAddLayer}
              onRemoveLayer={onRemoveLayer}
              onUpdateName={onUpdateName}
              onToggle={onToggle}
              onMove={onMove}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
