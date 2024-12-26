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
        layer.style.marginX && depth > 0 ? `mx-[${layer.style.marginX}]` : "", 
        layer.style.marginY && depth > 0 ? `my-[${layer.style.marginY}]` : "", 
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

      const numberOfGroups = Math.ceil(
        (layer.style.otpBox ?? 6) /
          (layer.style.optSepratorGap
            ? layer.style.optSepratorGap > 0
              ? layer.style.optSepratorGap
              : 1
            : 1)
      );

      let lastSlot = (layer.style.otpBox ?? 6) % numberOfGroups;
      if (lastSlot === 0) lastSlot = layer.style.optSepratorGap ?? 2;

      if (layer.type === "div")
        return `${indent}<div className="${tailwindClasses}">\n${childrenCode}\n${indent}</div>`;
      else if (layer.type === "text-input")
        return `${indent}<LabelInputContainer className="cursor-pointer">\n${indent}  <Label htmlFor="${layer.style.id}" className="cursor-pointer">\n${indent}    ${layer.style.label}\n${indent}  </Label>\n${indent}  <Input id="${layer.style.id}" placeholder={"${layer.style.placeholder}"} type="text"/>\n${indent}</LabelInputContainer>`;
      else if (layer.type === "button") {
        return `${indent}<Button>\n${indent}  ${layer.style.label}\n${indent}</Button>`;
      } else if (layer.type === "file-upload") {
        return `${indent}<LabelInputContainer className="cursor-pointer">\n${indent}  <Label htmlFor="${layer.style.id}" className="cursor-pointer">\n${indent}    ${layer.style.label}\n${indent}  </Label>\n${indent}  <Input id="${layer.style.id}" type="file"/>\n${indent}</LabelInputContainer>`;
      } else if (layer.type === "input-otp") {
        return `    <LabelInputContainer key={layer.id}>
      <Label htmlFor={layer.style.id}>${layer.style.label}</Label>
      <InputOTP maxLength=${layer.style.otpBox ?? 6}>
        ${Array.from({ length: numberOfGroups })
          .map((_, index1) => {
            return `<div key=${index1} className="flex justify-center items-center">
          <InputOTPGroup>
            ${Array.from({
              length:
                index1 === numberOfGroups - 1
                  ? lastSlot
                  : layer.style.optSepratorGap ?? 2,
            })
              .map((_, index2) => {
                return `<InputOTPSlot
                index=${index1 * (layer.style.optSepratorGap ?? 2) + index2}
                key=${
                  index1 * (layer.style.optSepratorGap ?? 2) + index2
                }/>\n           `;
              })
              .join("")}
          </InputOTPGroup>
          ${
            index1 <
            Math.ceil(
              (layer.style.otpBox ?? 6) / (layer.style.optSepratorGap ?? 2)
            ) -
              1
              ? `<InputOTPSeparator />`
              : ""
          }
        </div>\n        `;
          })
          .join("")}
  </InputOTP>
</LabelInputContainer>`;
      } else if (layer.type === "combo-box") {
        return `${indent}<LabelInputContainer className="cursor-pointer">\n${indent}  <Label htmlFor="${layer.style.id}" className="cursor-pointer">\n${indent}    ${layer.style.label}\n${indent}  </Label>\n${indent}  <Combobox setValue={() => {}} />\n${indent}</LabelInputContainer>`;
      } else if (layer.type === "radio-input") {
        return `    <LabelInputContainer class="cursor-pointer" key="${
          layer.id
        }">
      <Label htmlFor="file-upload" class="cursor-pointer">
        ${layer.style.label}
      </Label>
      <RadioGroup defaultValue="0" className="${`${layer.isToggled && "flex flex-wrap gap-8"}`}">
        ${Array.from({ length: layer.style.radioOptions ?? 3 })
          .map((_, index) => {
            return `<div class="flex items-center space-x-2" key="${index}">
          <RadioGroupItem value="${index}" id="radio-${index}" />
          <Label htmlFor="radio-${index}">
            ${
              layer.style.radioOptionsName
                ? layer.style.radioOptionsName[index]
                : `Option ${index + 1}`
            }
          </Label>
        </div>\n        `;
          })
          .join("")}
      </RadioGroup>
    </LabelInputContainer>`;
      }
    })
    .join("\n");
};

export default codeGenerator;
