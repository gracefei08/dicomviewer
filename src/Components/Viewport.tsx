import React, { useRef, useContext, useEffect,useState} from 'react';

import { DataContext } from '../Context/DataContext';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { viewport } from '@cornerstonejs/tools/dist/types/utilities';

const state = {
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: [
      "dicomweb:https://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/bJiSsXVSfv_1.3.12.2.1107.5.1.4.64104.30000011091411531573400005893/300.dcm.gz",
"dicomweb:https://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/bJiSsXVSfv_1.3.12.2.1107.5.1.4.64104.30000011091411531573400005893/301.dcm.gz"

    ],
  };
export default function Viewport() {
  const elementRef = useRef<HTMLDivElement>(null)
  const [test,setTest] = useState(0)
  const [v,setV] = useState()
  //const { viewport_idx, rendering_engine } = props;
  const viewport_idx  = 1;
  const renderingEngine  = useContext(DataContext);
  const viewportId = `${viewport_idx}-vp`;

  //const [renderingEngine,SetRenderingEngine] = useState(new cornerstone.RenderingEngine("renderingEngineId"))

    useEffect(() => {
    const loadImagesAndDisplay = async () => {

      
      const viewportInput = {
        viewportId,
        type: cornerstone.Enums.ViewportType.STACK,
        element: elementRef.current,
        defaultOptions: {

        },
      };
      // @ts-ignore
      renderingEngine.enableElement(viewportInput);
        // @ts-ignore
      const viewport = (renderingEngine.getViewport(viewportId) );

      //const { s, ww, wc } = viewport_data;

      state.imageIds.map((imageId:string) => {
        cornerstone.imageLoader.loadAndCacheImage(imageId);
      });

      const stack = state.imageIds;
      console.log(stack)
        // @ts-ignore
      await viewport.setStack(stack);

        // @ts-ignore
      viewport.setProperties({
        voiRange: cornerstone.utilities.windowLevel.toLowHighRange(1400, 1200),
        isComputedVOI: false,
      
      });
      //viewport.sWidth=300;
      //viewport.sHeight=300;
      console.log(viewport.getZoom())
      viewport.render();
    };
      
    const addCornerstoneTools = () => {

      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      //const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      const {
        PanTool,
        WindowLevelTool,
        StackScrollTool,
        StackScrollMouseWheelTool,
        ZoomTool,
        PlanarRotateTool,
        ToolGroupManager,
        Enums: csToolsEnums,
      } = cornerstoneTools;
     
      const { MouseBindings } = csToolsEnums;
      
      const toolGroupId = `${viewport_idx}-tl`;

      // Define a tool group, which defines how mouse events map to tool commands for
      // Any viewport using the group
      ToolGroupManager.createToolGroup(toolGroupId);
      const toolGroup = ToolGroupManager.getToolGroup(toolGroupId);
      if(toolGroup){
    
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });

        toolGroup.setToolActive(WindowLevelTool.toolName, { bindings: [{ mouseButton: MouseBindings.Primary }], });
        toolGroup.setToolActive(PanTool.toolName, { bindings: [{ mouseButton: MouseBindings.Auxiliary }], });
        toolGroup.setToolActive(ZoomTool.toolName, { bindings: [{ mouseButton: MouseBindings.Secondary }], });
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
      
 
      toolGroup.addViewport(`${viewport_idx}-vp`, 'myRenderingEngine');
   };
    };
    console.log("mounting viewport");
    if (renderingEngine) {
      loadImagesAndDisplay().then(() => {
        addCornerstoneTools();
      });
    }
    return () => { console.log("unmounting viewport"); };
  }, [v]);


  return (
    <>
    
      <div ref={elementRef} id={"1"} style={{ width: '100%', height: '100%' }} />
      {test}
    </>
  );
}