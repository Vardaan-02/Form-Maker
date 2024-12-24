import { RootState } from "@/store/store";
import { LayerItem } from "./layer-item";
import { useSelector } from "react-redux";

export default function LayerManager() {
  const { layers } = useSelector((state: RootState) => state.sidebar);

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="mb-4 text-xl font-bold">Layers</h2>
      {layers.map((layer) => (
        <LayerItem key={layer.id} layer={layer} />
      ))}
    </div>
  );
}
