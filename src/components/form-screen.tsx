"use client";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import codeGenerator from "@/lib/code-genrator";
import { Copy } from "lucide-react";
import renderLayers from "@/lib/render-layer";
export default function FormScreen() {
  const { layers, sidebarWidth } = useSelector(
    (state: RootState) => state.sidebar
  );

  const { showBorder, codeBorder } = useSelector(
    (state: RootState) => state.border
  );

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
          <pre className="h-full w-full realtive">
            <Copy className="absolute right-16 top-28" />
            {codeGenerator(layers, 1, codeBorder)}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
