"use client";

import { Layer } from "@/types/Layer";
import { useState, useCallback } from "react";

export function useSidebarState() {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "1",
      name: "Root Layer",
      isToggled: false,
      children: [],
      style: {},
      depth: 1,
    },
  ]);
  const [sidebarWidth, setSidebarWidth] = useState(500);

  const addLayer = useCallback((parentId: string) => {
    setLayers((prevLayers) => {
      const addToChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === parentId) {
            return {
              ...layer,
              children: [
                ...layer.children,
                {
                  id: parentId + (layer.children.length + 1),
                  name: "Untitled Layer",
                  isToggled: false,
                  children: [],
                  style: {},
                  depth: layer.depth + 1,
                },
              ],
            };
          }
          if (layer.children.length > 0) {
            return { ...layer, children: addToChildren(layer.children) };
          }
          return layer;
        });
      };

      return addToChildren(prevLayers);
    });
  }, []);

  const removeLayer = useCallback((id: string) => {
    setLayers((prevLayers) => {
      const removeFromChildren = (layers: Layer[]): Layer[] => {
        return layers
          .map((layer) => {
            if (layer.children.length > 0) {
              layer.children = removeFromChildren(layer.children);
            }
            return layer;
          })
          .filter((layer) => layer.id !== id);
      };

      return removeFromChildren(prevLayers);
    });
  }, []);

  const updateLayerName = useCallback((id: string, name: string) => {
    setLayers((prevLayers) => {
      const updateInChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === id) {
            return { ...layer, name: name || "Untitled Layer" };
          }
          if (layer.children.length > 0) {
            return { ...layer, children: updateInChildren(layer.children) };
          }
          return layer;
        });
      };

      return updateInChildren(prevLayers);
    });
  }, []);

  const toggleLayer = useCallback((id: string) => {
    setLayers((prevLayers) => {
      const toggleInChildren = (layers: Layer[]): Layer[] => {
        return layers.map((layer) => {
          if (layer.id === id) {
            return { ...layer, isToggled: !layer.isToggled };
          }
          if (layer.children.length > 0) {
            return { ...layer, children: toggleInChildren(layer.children) };
          }
          return layer;
        });
      };

      return toggleInChildren(prevLayers);
    });
  }, []);

  const moveLayer = useCallback((id: string, direction: "up" | "down") => {
    setLayers((prevLayers) => {
      const moveInChildren = (layers: Layer[]): Layer[] => {
        const index = layers.findIndex((layer) => layer.id === id);
        if (index !== -1) {
          const newIndex =
            direction === "up"
              ? Math.max(0, index - 1)
              : Math.min(layers.length - 1, index + 1);
          if (index !== newIndex) {
            const [movedLayer] = layers.splice(index, 1);
            layers.splice(newIndex, 0, movedLayer);
          }
          return [...layers];
        }
        return layers.map((layer) => {
          if (layer.children.length > 0) {
            return { ...layer, children: moveInChildren(layer.children) };
          }
          return layer;
        });
      };

      return moveInChildren(prevLayers);
    });
  }, []);

  return {
    layers,
    sidebarWidth,
    setSidebarWidth,
    addLayer,
    removeLayer,
    updateLayerName,
    toggleLayer,
    moveLayer,
  };
}
