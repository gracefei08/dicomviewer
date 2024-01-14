import { createContext, useState, useEffect, useReducer } from "react";

import { PropsWithChildren } from "react";
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
//@ts-ignore
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
import dicomParser from 'dicom-parser';

export const DataContext = createContext({});    

// create initial data object from URL query string


export const DataProvider = ({ children }: PropsWithChildren<{}>) => {
    //const [data, dispatch] = useReducer(dataReducer, urlData);
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
    
    }, []);

    return (
     
            <DataContext.Provider value={{ renderingEngine }}>
                {children}
            </DataContext.Provider>
 
    );
};