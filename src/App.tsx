
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
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

  //let a = value.reduce((pS, cS) => [...pS, cS.instances.reduce((pV, cV) => [...pV, cV.url], [])], [])
  const [metaDataList, setMetaDataList] = useState<MetaData[]>([]);
  const [metaDataSelected, setMetaDataSelected] = useState<MetaData>({
    thumbnail:"",
    label:"",
    id:0,
    modality:"",
    prefix:"", 
    suffix: "",
    start_slice:0,
    end_slice : 0,
    ww:0,
    wc:0,
    ci:0,
    z:0,
    px:0,
    py:0,
    r:0,
    cord:[-1,-1]
  });
  const [drawerState, setDrawerState] = useState(false);
  const [rightdrawerState, setRightDrawerState] = useState(false);
  useEffect(() => {
    setMetaDataList(generateMetaData(value))
}, [value])

const handleClick = (metadata:MetaData) => {
  setDrawerState(true)
  setMetaDataSelected(metadata)
}
const handleClick2 = () => {
  setRightDrawerState(true)

}
  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <HeaderComp/>
      <Divider />
      <Button variant="contained" disableElevation onClick={handleClick2}>Organize Layout</Button>
      {metaDataList && metaDataList.map(metadata =>
        <Card sx={{ maxWidth: 350 }}>
          <CardActionArea onClick={()=>handleClick(metadata)}>
            {/**<CardMedia
              component="img"
              height="140"
              image={metadata.thumbnail}
              alt="thumbnail image"
            />*/}

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
            <DrawerComp setDrawerState ={setDrawerState} metadata={metaDataSelected} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
           
          </Drawer>

          <Drawer
            anchor='right'
            open={rightdrawerState}
            onClose={()=>setRightDrawerState(false)}
          >
            <RightDrawerComp setDrawerState ={setRightDrawerState} metadata={metaDataSelected} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
           
          </Drawer>


        </Card>
      )}

    </div>
    </DndProvider>
  );
}

export default App;

