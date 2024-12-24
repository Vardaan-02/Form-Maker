import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { updateLayerStyle } from "@/store/slices/sidebar-slice";
import { Layer } from "@/types/Layer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

const unitOptions = ["px", "em", "rem", "%", "vw", "vh"];

interface UnitPopUp {
  layer: Layer;
  name: string;
  prop?: string;
}

const separateValueAndUnit = (input: string) => {
  const regex = /^(-?\d*\.?\d+)([a-z%]+)$/i;
  const match = input.match(regex);

  if (!match) return null;

  const [, value, unit] = match;
  return {
    value,
    unit,
  };
};

const UnitPopUp = ({ layer, name, prop = "0px" }: UnitPopUp) => {
  const dispatch = useDispatch();

  return (
    <div key={name} className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right capitalize">
        {name}
      </Label>
      <div className="col-span-2">
        <Input
          id={name}
          value={separateValueAndUnit(prop)?.value || ""}
          onChange={(e) => {
            const currentUnit = separateValueAndUnit(prop)?.unit || "rem";
            dispatch(
              updateLayerStyle({
                layerId: layer.id,
                style: {
                  ...layer.style,
                  [name.toLowerCase()]: e.currentTarget.value + currentUnit,
                },
              })
            );
          }}
        />
      </div>
      <Select
        value={separateValueAndUnit(prop)?.unit || "rem"}
        onValueChange={(value) =>
          dispatch(
            updateLayerStyle({
              layerId: layer.id,
              style: {
                ...layer.style,
                [name.replace(/\s+/g, "").toLowerCase()]:
                  separateValueAndUnit(prop)?.value + value,
              },
            })
          )
        }
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
  );
};

export default UnitPopUp;
