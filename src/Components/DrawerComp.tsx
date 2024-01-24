import { Button } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import SliderComp from './SliderComp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MetaData,generateURL  } from '../utils';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import Viewport from './Viewport';

import CopyToClipboardButtonComp from './CopyToClipboardButtonComp';



interface DrawerCompProps {
    metadata: MetaData,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
  setDrawerState:React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerComp: React.VFC<DrawerCompProps>  = ({metadata,metaDataList,setMetaDataList,setDrawerState}) => {
    const [url, setURL] = useState<string>("Click Generate URL");
    const renderingEngine  = useContext(DataContext);
     
    const saveStates = ((key:string, event: React.ChangeEvent<HTMLInputElement>)=>{
        setMetaDataList([...metaDataList].map(object => {
            if(object.id === metadata.id) {
              return {
                ...object,
                [key]:event.target.value
              }
            }
            
            else return object;
          }))



    })
    return (
        <Box
        sx={{ width:400 }}
        role="presentation"
      >

      <IconButton aria-label="delete" size="small" onClick = {()=>setDrawerState(false)}>
        <CloseIcon />
        
      </IconButton>
      <Typography>{metadata.label}</Typography>

      <Divider />

        <Typography>Slice Range</Typography>
        <SliderComp metadata={metadata} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
        <Typography>WW</Typography>
        <TextField hiddenLabel defaultValue={metadata.ww} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ww", e)}/>
        <Typography>WC</Typography>
        <TextField hiddenLabel defaultValue={metadata.wc} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("wc", e)}/>
        <Typography>Ci</Typography>
        <TextField hiddenLabel defaultValue={metadata.ci} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ci", e)}/>
        <Typography>z</Typography>
        <TextField hiddenLabel defaultValue={metadata.z} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("z", e)}/>
        <Typography>px</Typography>
        <TextField hiddenLabel defaultValue={metadata.px} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("px", e)}/>
        <Typography>py</Typography>
        <TextField hiddenLabel defaultValue={metadata.py} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("py", e)}/>
        <Typography>r</Typography>
        <TextField hiddenLabel defaultValue={metadata.r} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("r", e)}/>

        <Divider />
    
    {/** 
        <Button variant="contained" onClick = {()=>setURL(generateURL((metaDataList.filter(function(element){ return element.id>= metadata.id; }))[0]))}>Generate URL</Button>
    
      
          {url }
          
          <CopyToClipboardButtonComp url={url}/>*/}
        
    
    </Box>
      
    )
}

export default DrawerComp

