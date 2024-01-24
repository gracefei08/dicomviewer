
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { DataContext } from './Context/DataContext';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { generateMetaData, generateURL } from './utils';
import CopyToClipboardButtonComp from './Components/CopyToClipboardButtonComp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerComp from './Components/DrawerComp';
import { MetaData } from './utils';
import RightDrawerComp from './Components/RightDrawerComp';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Viewport from './Components/Viewport';
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
//@ts-ignore
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';
//@ts-ignore
import * as cornerstone from '@cornerstonejs/core';
//@ts-ignore
import * as cornerstoneTools from '@cornerstonejs/tools';
import dicomParser from 'dicom-parser';
import { convertStackToVolumeSegmentation } from '@cornerstonejs/tools/dist/types/stateManagement/segmentation';



function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal("PAC_DATA", []);
  const renderingEngine  = useContext(DataContext);
  //let a = value.reduce((pS, cS) => [...pS, cS.instances.reduce((pV, cV) => [...pV, cV.url], [])], [])
  const [metaDataList, setMetaDataList] = useState<MetaData[]>([]);
  const [metaDataSelected, setMetaDataSelected] = useState(0)
  const [drawerState, setDrawerState] = useState(false);
  const [rightdrawerState, setRightDrawerState] = useState(false);
  useEffect(() => {
    setMetaDataList(generateMetaData(value))
}, [value])


const handleClick = (metadata:MetaData) => {
  setDrawerState(true)
  setMetaDataSelected(metadata.id)
}
const handleClick2 = () => {
  setRightDrawerState(true)

}
/** 
useEffect(() => {
  console.log("layout rerendering")
  const handleResize = () => {
    
    if (renderingEngine) renderingEngine.resize(true);
  };
  console.log(renderingEngine)
  if (renderingEngine) window.addEventListener('resize', handleResize);
  return () => {
      window.removeEventListener('resize', handleResize);
  };
  

}, [renderingEngine]);
*/
  return (

    <DndProvider backend={HTML5Backend}>

    <div >
      <HeaderComp/>
      <Divider />
      
      <Button variant="contained" disableElevation onClick={handleClick2}>Organize Layout</Button>
      {metaDataList && metaDataList.map(metadata =>
        <Card sx={{ maxWidth: 350 }}>
          <CardActionArea onClick={()=>handleClick(metadata)}>
  

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {metadata.label}
              </Typography>

            </CardContent>


          </CardActionArea>
          <Drawer
            anchor='left'
            open={drawerState}
            onClose={()=>setDrawerState(false)}
          >
            <DrawerComp setDrawerState ={setDrawerState} metadataId={metaDataSelected} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
           
          </Drawer>

          <Drawer
            anchor='right'
            open={rightdrawerState}
            onClose={()=>setRightDrawerState(false)}
          >
            <RightDrawerComp setDrawerState ={setRightDrawerState} metadataId={metaDataSelected} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
           
          </Drawer>


        </Card>
      )}

    </div>
    
    </DndProvider>

  );
}

export default App;

