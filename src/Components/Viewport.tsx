import React, { useRef, useContext, useEffect,useState} from 'react';

import { DataContext } from '../DataContext';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
//@ts-ignore
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import dicomParser from 'dicom-parser';
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
      "dicomweb://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/bJiSsXVSfv_1.3.12.2.1107.5.1.4.64104.30000011091411531573400005893/202.dcm.gz",
      'dicomweb://s3.amazonaws.com/elasticbeanstalk-us-east-1-843279806438/dicom/production/bJiSsXVSfv_1.3.12.2.1107.5.1.4.64104.30000011091411531573400005893/203.dcm.gz'
    ],
  };
export default function Viewport() {
  const elementRef = useRef<HTMLDivElement>(null)
  const elementRef2 = document.createElement('div');
  //const { viewport_idx, rendering_engine } = props;
  const viewport_idx  = 1;
  //const renderingEngine  = useContext(DataContext).data;

  const [renderingEngine,SetRenderingEngine] = useState(new cornerstone.RenderingEngine("renderingEngineId"))
  useEffect(() => {

    const setupCornerstone = async () => {
        //window.cornerstone = cornerstone;
        //window.cornerstoneTools = cornerstoneTools;
        cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
        cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;
        await cornerstone.init();
        await cornerstoneTools.init();
  
        //const renderingEngineId = 'myRenderingEngine';
        //const re = new cornerstone.RenderingEngine(renderingEngineId);
  
        const {
            PanTool,
            WindowLevelTool,
            StackScrollTool,
            StackScrollMouseWheelTool,
            ZoomTool,
            PlanarRotateTool,
        } = cornerstoneTools;
  
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(StackScrollTool);
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);
        cornerstoneTools.addTool(PlanarRotateTool);
  
    };
  
    setupCornerstone();

    const loadImagesAndDisplay = async () => {

      const viewportId = `${viewport_idx}-vp`;
      const viewportInput = {
        viewportId,
        type: cornerstone.Enums.ViewportType.STACK,
        element: elementRef2,
        defaultOptions: {

        },
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = (
        renderingEngine.getViewport(viewportId)
      );

      //const { s, ww, wc } = viewport;

      state.imageIds.map((imageId:any) => {
        cornerstone.imageLoader.loadAndCacheImage(imageId);
      });

      const stack = state.imageIds;
      // @ts-ignore
      await viewport.setStack(stack);

      // @ts-ignore
      viewport.setProperties({
        voiRange: cornerstone.utilities.windowLevel.toLowHighRange(1400, 1200),
        isComputedVOI: false,
      });

      viewport.render();
    };

    const addCornerstoneTools = () => {

      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

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
      if (mobile) {
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollTool.toolName);

        toolGroup.setToolActive(ZoomTool.toolName, { bindings: [{ numTouchPoints: 2 }], });
        toolGroup.setToolActive(StackScrollTool.toolName, { bindings: [{ mouseButton: MouseBindings.Primary }], });
        toolGroup.setToolActive(WindowLevelTool.toolName, { bindings: [{ numTouchPoints: 3 }], });

      } else {
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollMouseWheelTool.toolName, { loop: true });

        toolGroup.setToolActive(WindowLevelTool.toolName, { bindings: [{ mouseButton: MouseBindings.Primary }], });
        toolGroup.setToolActive(PanTool.toolName, { bindings: [{ mouseButton: MouseBindings.Auxiliary }], });
        toolGroup.setToolActive(ZoomTool.toolName, { bindings: [{ mouseButton: MouseBindings.Secondary }], });
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);
      }

      toolGroup.addViewport(`${viewport_idx}-vp`, 'myRenderingEngine');
    };
    };
    console.log("mounting viewport");
    if (state.imageIds) {
      loadImagesAndDisplay().then(() => {
        addCornerstoneTools();
      });
    }
    return () => { console.log("unmounting viewport"); };
  }, []);


  return (
    <>
      <div ref={elementRef} id={"1"} style={{ width: '100%', height: '100%' }} />
    </>
  );
}