import { Layer } from "@/types/Layer";

const codeGenerator = (
  layers: Layer[],
  depth: number = 0,
  codeBorder: boolean
): string => {
  const indentation = "  ";

  return layers
    .map((layer) => {
      const indent = indentation.repeat(depth);

      const tailwindClasses = [
        layer.isToggled ? "flex-row" : "flex-col",
        "flex",
        "relative",
        "border",
        layer.style.justifyContent &&
          `justify-${layer.style.justifyContent.replace("flex-", "")}`,
        layer.style.alignItems &&
          `items-${layer.style.alignItems.replace("flex-", "")}`,
        layer.style.padding && `p-[${layer.style.padding}]`,
        layer.style.margin && depth > 0 ? `m-[${layer.style.margin}]` : "",
        layer.style.backgroundColor && `bg-[${layer.style.backgroundColor}]`,
        layer.style.borderRadius && `rounded-[${layer.style.borderRadius}]`,
        codeBorder
          ? layer.style.borderWidth && `border-[${layer.style.borderWidth}]`
          : "border-[0px]",
        layer.style.borderColor && `border-[${layer.style.borderColor}]`,
        layer.style.opacity && `opacity-[${layer.style.opacity}]`,
        layer.style.gap && `gap-[${layer.style.gap}]`,
        layer.style.width && `w-[${layer.style.width}]`,
        layer.style.height && `h-[${layer.style.height}]`,
      ]
        .filter(Boolean)
        .join(" ");

      const childrenCode =
        layer.children.length > 0
          ? codeGenerator(layer.children, depth + 1, codeBorder)
          : "";

      if (layer.type === "div")
        return `${indent}<div className="${tailwindClasses}">\n${childrenCode}\n${indent}</div>`;
      else if (layer.type === "text-input")
        return `${indent}<LabelInputContainer className="cursor-pointer">\n${indent}  <Label htmlFor="text-input" className="cursor-pointer">\n${indent}    ${layer.style.label}\n${indent}  </Label>\n${indent}  <Input id="text-input" placeholder={"${layer.style.placeholder}"} type="text"/>\n${indent}</LabelInputContainer>`;
      else if (layer.type === "button") {
        return `${indent}<Button>\n${indent}  ${layer.style.label}\n${indent}</Button>`;
      }
    })
    .join("\n");
};

export default codeGenerator;
