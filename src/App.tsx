
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





function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal("PAC_DATA", []);
  const [url, setURL] = useState<string>("Click Generate URL");


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
    window_width:0,
    window_center:0,
    ci:0,
    z:0,
    px:0,
    py:0,
    r:0,
  });
  const [drawerState, setDrawerState] = useState(false);
  useEffect(() => {
    setMetaDataList(generateMetaData(value))
}, [value])

const handleClick = (metadata:MetaData) => {
  setDrawerState(true)
  setMetaDataSelected(metadata)
}

  return (
    <div>
      <HeaderComp/>
      <Divider />
      <Button variant="contained">Organize Layout</Button>
      {metaDataList && metaDataList.map(metadata =>
        <Card sx={{ maxWidth: 350 }}>
          <CardActionArea onClick={()=>handleClick(metadata)}>
            <CardMedia
              component="img"
              height="140"
              image={metadata.thumbnail}
              alt="thumbnail image"
            />
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


        </Card>
      )}

    </div>
  );
}
/** 
{metaDataList && metaDataList.map( metadata=> 
  <div>{generateURL(metadata)}
  <CopyToClipboardButtonComp/>
  </div> 
  
)}*/
export default App;

