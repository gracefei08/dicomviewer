
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { RenderEngineContext,MetaDataListContext } from './Context/DataContext';
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




function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal("PAC_DATA", []);
 
  const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);
  //let a = value.reduce((pS, cS) => [...pS, cS.instances.reduce((pV, cV) => [...pV, cV.url], [])], [])
  const [metaDataSelected, setMetaDataSelected] = useState(0)
  const [drawerState, setDrawerState] = useState(false);
  const [rightdrawerState, setRightDrawerState] = useState(false);



const handleClick = (metadata:MetaData) => {
  setDrawerState(true)
  setMetaDataSelected(metadata.id)
}
const handleClick2 = () => {
  setRightDrawerState(true)

}

  return (

    <DndProvider backend={HTML5Backend}>

    <div >
      <HeaderComp/>
      <Divider />
      
      <Button variant="contained" disableElevation onClick={handleClick2}>Organize Layout</Button>
      {metaDataList.map(metadata =>
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
            <DrawerComp setDrawerState ={setDrawerState} metadataId={metaDataSelected} />
           
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

