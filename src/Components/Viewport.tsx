import React, { useRef, useContext, useEffect, useState } from 'react';

import { DataContext } from '../Context/DataContext';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { viewport } from '@cornerstonejs/tools/dist/types/utilities';
import { MetaData,generateURL,recreateUriStringList  } from '../utils';


interface ViewportProps {
  metadata: MetaData,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
}

const Viewport: React.VFC<ViewportProps>  = ({metadata,metaDataList,setMetaDataList}) => {


  const stack = recreateUriStringList(metadata.prefix,metadata.suffix,metadata.start_slice,metadata.end_slice,metadata.pad)
  //const viewportId = String(metadata.id);
  const viewportId = `${String(metadata.id)}-vp`;
  const elementRef = useRef<HTMLDivElement>(null)
  //const { viewport_idx, rendering_engine } = props;
  const renderingEngine = useContext(DataContext);


  // @ts-ignore
  const [viewport2, SetViewport2] = useState<cornerstone.StackViewport>()


  useEffect(() => {

    const viewportInput = {
      viewportId,
      type: cornerstone.Enums.ViewportType.STACK,
      element: elementRef.current as HTMLInputElement,
      defaultOptions: {

      },
    };    

    const loadImagesAndDisplay = async () => {
      if (renderingEngine) {
        renderingEngine.enableElement(viewportInput);
        const viewport = (renderingEngine.getViewport(viewportId) as cornerstone.StackViewport);
        viewport.element.addEventListener('click', ()=>{
          const vp = (renderingEngine.getViewport(viewportId) as cornerstone.StackViewport);
          //@ts-ignore
          const window = cornerstone.utilities.windowLevel.toWindowLevel(vp.voiRange.lower, vp.voiRange.upper);

          setMetaDataList([...metaDataList].map(object => {
            if(object.id === metadata.id) {
              return {
                ...object,
                "wc":window.windowCenter,
              }
            }
            
            else return object;
          }))
          
        })
        stack.map((imageId: string) => {
          cornerstone.imageLoader.loadAndCacheImage(imageId);
        });


        await viewport.setStack(stack)
        // @ts-ignore
        //SetViewport(await viewport.setStack(state.imageIds));
        viewport.setProperties({
          voiRange: cornerstone.utilities.windowLevel.toLowHighRange(1000, 1200),
          isComputedVOI: false,

        });

        //viewport.sWidth=300;
        //viewport.sHeight=300;
        // @ts-ignore
        //SetViewport2(viewport)
        //cornerstone.triggerEvent(viewport.element,)
        viewport.render();
      }
    };

    const addCornerstoneTools = () => {

      //const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      //const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      const {
        PanTool,
        WindowLevelTool,
        StackScrollMouseWheelTool,
        ZoomTool,
        ToolGroupManager,
        Enums: csToolsEnums,
      } = cornerstoneTools;

      const { MouseBindings } = csToolsEnums;

      const toolGroupId = `${String(metadata.id)}-tl`;

      // Define a tool group, which defines how mouse events map to tool commands for
      // Any viewport using the group
      ToolGroupManager.createToolGroup(toolGroupId);
      const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
      if (toolGroup) {

        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });

        toolGroup.setToolActive(WindowLevelTool.toolName, { bindings: [{ mouseButton: MouseBindings.Primary }], });
        toolGroup.setToolActive(PanTool.toolName, { bindings: [{ mouseButton: MouseBindings.Auxiliary }], });
        toolGroup.setToolActive(ZoomTool.toolName, { bindings: [{ mouseButton: MouseBindings.Secondary }], });
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

        toolGroup.addViewport(`${viewportId}`, 'myRenderingEngine');
      };
    };
    console.log("mounting viewport");
    if (renderingEngine) {
      loadImagesAndDisplay().then(() => {
        addCornerstoneTools();
      });
    }
    return () => { console.log("unmounting viewport"); };
  }, []);


  return (
    <>
      <div ref={elementRef} id={viewportId} style={{ width: '100%', height: '100%' }} />
    </>
  );
}

export default Viewport


