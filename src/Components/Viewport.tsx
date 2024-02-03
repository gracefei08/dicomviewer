import React, { useRef, useContext, useEffect, useState,useMemo,useCallback } from 'react';

import { RenderEngineContext } from '../Context/DataContext';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import { viewport } from '@cornerstonejs/tools/dist/types/utilities';
import { MetaData,generateURL,recreateUriStringList,initalValues  } from '../utils';
import { MetaDataListContext } from '../Context/DataContext';


interface ViewportProps {
  metadataId: number,
  stateFlag:boolean,
  setStateFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const Viewport: React.VFC<ViewportProps>  = ({metadataId,stateFlag,setStateFlag}) => {
  const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);
  const refValue = useRef(metaDataList);
  const [metadata, setMetadata] =  useState<MetaData>(initalValues);
  useMemo(() => {
  
     //@ts-ignore
    setMetadata(metaDataList.find(x => x.id ===metadataId))
    refValue.current = metaDataList;
    console.log("view",refValue.current)
   
},[metaDataList])


  const stack=recreateUriStringList(metadata.prefix,metadata.suffix,metadata.start_slice,metadata.end_slice,metadata.pad)
  //const viewportId = String(metadata.id);
  const viewportId = `${String(metadata.id)}-vp`;
  const elementRef = useRef<HTMLDivElement>(null)
  //const { viewport_idx, rendering_engine } = props;
  const renderingEngine = useContext(RenderEngineContext);


  
  const updateStates =  (_event:Event)=>{
    if (renderingEngine){
    const vp = (renderingEngine.getViewport(viewportId) as cornerstone.StackViewport);
    //@ts-ignoreS
    const window = cornerstone.utilities.windowLevel.toWindowLevel(vp.voiRange.lower, vp.voiRange.upper);
    const [x,y] =vp.getPan()
    
  
    setMetaDataList([...refValue.current].map(object => {
      if(object.id === metadata.id) {
        return {
          ...object,
          "wc":window.windowCenter,
          "ww":window.windowWidth,
          "ci":vp.getCurrentImageIdIndex()+metadata.start_slice,
          "z":vp.getZoom(),
          "px":String(x),
          "py":String(y)
        }
      }
      
      else return object;
    }))
  }
  }


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
        viewport.element.addEventListener('mousemove',updateStates)
        viewport.element.addEventListener('wheel',updateStates)
  
        stack.map((imageId: string) => {
          cornerstone.imageLoader.loadAndCacheImage(imageId);
        });

        //await viewport.setStack(stack.slice(metadata.start_slice,metadata.end_slice),metadata.ci-metadata.start_slice+1)]
        await viewport.setStack(stack.slice(0,metadata.end_slice),metadata.ci-metadata.start_slice+1)
        viewport.setZoom(metadata.z)
        viewport.setPan([Number(metadata.px),Number(metadata.py)])
        //await viewport.setImageIdIndex(metadata.ci)
        // @ts-ignore
        //SetViewport(await viewport.setStack(state.imageIds));
        viewport.setProperties({
          voiRange: cornerstone.utilities.windowLevel.toLowHighRange(metadata.ww, metadata.wc),
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

  useEffect(()=>{
    const update = async () => {
    //@ts-ignoreS
    const viewport = (renderingEngine.getViewport(viewportId) as cornerstone.StackViewport);
    
    if (viewport &&stateFlag){
   
    //await viewport.setImageIdIndex(metadata.ci)
    //console.log('update',metadata.start_slice,metadata.end_slice)
    //console.log(metadata)
    viewport.setStack(stack.slice(0,metadata.end_slice),metadata.ci-metadata.start_slice+1)
    viewport.setZoom(metadata.z)
    viewport.setProperties({
      voiRange: cornerstone.utilities.windowLevel.toLowHighRange(metadata.ww, metadata.wc),
      isComputedVOI: false,

    });

    viewport.setPan([metadata.px==="-"?0:Number(metadata.px),metadata.py==="-"?0:Number(metadata.py)])
 
    viewport.render()
    setStateFlag(false)
    }
  }

  },[metaDataList])
 
  return (
    <>
      <div ref={elementRef} id={viewportId} style={{ width: '100%', height: '100%'}} />
    </>
  );
}

export default Viewport


