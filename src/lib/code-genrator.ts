import { Layer } from "@/types/Layer";

const codeGenerator = (layers: Layer[], depth: number = 0): string => {
  const indentation = "  "; // You can adjust this based on the desired indentation level

  return layers
    .map((layer) => {
      // Create indentation based on the layer depth
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
        layer.style.padding && `p-${layer.style.padding}`,
        layer.style.margin && depth > 0 ? `m-${layer.style.margin}` : "",
        layer.style.backgroundColor && `bg-[${layer.style.backgroundColor}]`,
        layer.style.borderRadius && `rounded-${layer.style.borderRadius}`,
        layer.style.borderWidth && `border-${layer.style.borderWidth}`,
        layer.style.borderColor && `border-[${layer.style.borderColor}]`,
        layer.style.opacity && `opacity-${layer.style.opacity * 100}`,
        layer.style.gap && `gap-${layer.style.gap}`,
        layer.style.width && `w-[${layer.style.width}]`,
        layer.style.height && `h-[${layer.style.height}]`,
      ]
        .filter(Boolean)
        .join(" ");

      const childrenCode =
        layer.children.length > 0
          ? codeGenerator(layer.children, depth + 1)
          : "";

      return `${indent}<div className="${tailwindClasses}">\n${childrenCode}\n${indent}</div>`;
    })
    .join("\n");
};

export default codeGenerator;
