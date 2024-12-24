import { RootState } from "@/store/store";
import { LayerItem } from "./layer-item";
import { useDispatch, useSelector } from "react-redux";
import {
  addLayer,
  removeLayer,
  updateLayerName,
  toggleLayer,
  moveLayer,
} from "@/store/slices/sidebar-slice";

export default function LayerManager() {
  const { layers } = useSelector((state: RootState) => state.sidebar);

  const dispatch = useDispatch();

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Layers</h2>
      {layers.map((layer) => (
        <LayerItem
          key={layer.id}
          layer={layer}
          onAddLayer={(parentId: string) =>
            dispatch(addLayer({ parentId, type: "div" }))
          }
          onRemoveLayer={(id) => dispatch(removeLayer({ id }))}
          onUpdateName={(id, name) => dispatch(updateLayerName({ id, name }))}
          onToggle={(id) => dispatch(toggleLayer({ id }))}
          onMove={(id, direction) => dispatch(moveLayer({ id, direction }))}
        />
      ))}
    </div>
  );
}
