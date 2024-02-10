
import { useState } from 'react';
import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { MetaDataListContext } from './Context/DataContext';
import { useChromeStorageLocal } from 'use-chrome-storage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import DrawerComp from './Components/DrawerComp';
import { MetaData } from './utils';
import RightDrawerComp from './Components/RightDrawerComp';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';




function App() {
  const { metaDataList, setMetaDataList } = useContext(MetaDataListContext);
  const [metaDataSelected, setMetaDataSelected] = useState(0)
  const [drawerState, setDrawerState] = useState(false);
  const [rightdrawerState, setRightDrawerState] = useState(false);


  const handleClick = (metadata: MetaData) => {
    setDrawerState(true)
    setMetaDataSelected(metadata.id)
  }
  const handleClick2 = () => {
    setRightDrawerState(true)
  }

  return (

    <DndProvider backend={HTML5Backend}>

      <div >
        <HeaderComp />
        <Divider />

        <Button variant="contained" disableElevation onClick={handleClick2}>Organize Layout</Button>
        <Drawer
          anchor='right'
          open={rightdrawerState}
          onClose={() => setRightDrawerState(false)}
        >
          <RightDrawerComp setDrawerState={setRightDrawerState} metaDataList={metaDataList} setMetaDataList={setMetaDataList} />

        </Drawer>
        <Drawer
          anchor='left'
          open={drawerState}
          onClose={() => setDrawerState(false)}
        >
          <DrawerComp setDrawerState={setDrawerState} metadataId={metaDataSelected} />

        </Drawer>
        {metaDataList.map(metadata =>
          <Card sx={{ maxWidth: 350 }}>
            <CardActionArea onClick={() => handleClick(metadata)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {metadata.label}
                </Typography>

              </CardContent>


            </CardActionArea>
          </Card>
        )}
      </div>
    </DndProvider>

  );
}

export default App;

