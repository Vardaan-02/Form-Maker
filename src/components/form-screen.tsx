"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import codeGenerator from "@/lib/code-genrator";
import renderLayers from "@/lib/render-layer";
import { useDebugger } from "@/hooks/use-debugger";
export default function FormScreen() {
  const { layers, sidebarWidth } = useSelector(
    (state: RootState) => state.sidebar
  );

  const { showBorder, codeBorder } = useSelector(
    (state: RootState) => state.border
  );

  useDebugger(layers);

  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col  p-12"
      style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
    >
      <Tabs defaultValue="preview" className="h-[95%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="h-full">
          <div className="h-full w-full">
            {renderLayers(layers, 0, dispatch, showBorder)}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="mt-12 p-8 bg-secondary rounded-md shadow-xl">
            <pre className="h-full w-full realtive overflow-x-scroll no-scrollbar ">
              {codeGenerator(layers, 1, codeBorder)}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
