import { components } from "@/lib/components";

export default function DraggableComponent() {
  const handleDragStart = (
    e: React.DragEvent,
    inputName: string,
  ) => {
    e.dataTransfer.setData("inputType", inputName);
  };

  return (
    <div className="h-full p-4 space-y-8 no-scrollbar overflow-scroll">
      {components.map((input) => {
        return (
          <div
            key={input.name}
            onDragStart={(e) => handleDragStart(e, input.name)}
            draggable={true}
          >
            {input.jsx}
          </div>
        );
      })}
    </div>
  );
}
