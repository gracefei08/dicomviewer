import { Button } from '@mui/material'
import { useState,useEffect, useMemo } from 'react'
import { MetaDataListContext } from '../Context/DataContext';
import TextField from '@mui/material/TextField';
import SliderComp from './SliderComp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MetaData,generateURL,initalValues  } from '../utils';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { RenderEngineContext } from '../Context/DataContext';
import Viewport from './Viewport';

import CopyToClipboardButtonComp from './CopyToClipboardButtonComp';



interface DrawerCompProps {
    metadataId: number,
  setDrawerState:React.Dispatch<React.SetStateAction<boolean>>
}


const DrawerComp: React.VFC<DrawerCompProps>  = ({metadataId,setDrawerState}) => {
    const [metadata, setMetadata] =  useState<MetaData>(initalValues);
    const [stateFlag, setStateFlag] =  useState(false);
    const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);
    //console.log(metaDataList)
    
    useMemo(() => {
        // @ts-ignore
        setMetadata(metaDataList.find(x => x.id ===metadataId))
    },[metaDataList])
    const saveStates = ((key:string, event: React.ChangeEvent<HTMLInputElement>)=>{
        setStateFlag(true)
       
        setMetaDataList([...metaDataList].map(object => {
            
            if(object.id === metadataId) {
              if (key==="ci"){
                if (Number(event.target.value)>object.end_slice){
                  return {
                    ...object,
                    [key]:object.end_slice
                  }
                }
                if (Number(event.target.value)<object.start_slice){
                  return {
                    ...object,
                    [key]:0
                  }
                }
              }
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
      <div style={{height: "400px", width:"375px"}}>
      <Viewport metadataId={metadata.id} stateFlag={stateFlag} setStateFlag={setStateFlag}/>
      
      
      </div>

      <Divider />

        <Typography>Slice Range</Typography>
        <div style={{display: 'flex', marginLeft: "20px"}}><SliderComp metadata={metadata} stateFlag={stateFlag} setStateFlag={setStateFlag}/></div>
        <Typography>WW</Typography>
        <TextField hiddenLabel value={metadata.ww} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ww", e)}/>
        <Typography>WC</Typography>
        <TextField hiddenLabel value={metadata.wc} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("wc", e)}/>
        {/**fix Ci input */}
        <Typography>Ci</Typography>
        <TextField hiddenLabel value={metadata.ci+metadata.start_slice} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ci", e)}/>
        <Typography>z</Typography>
        <TextField hiddenLabel value={metadata.z} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("z", e)}/>
        <Typography>px</Typography>
        <TextField hiddenLabel value={metadata.px} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("px", e)}/>
        <Typography>py</Typography>
        <TextField hiddenLabel value={metadata.py} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("py", e)}/>
        <Typography>r</Typography>
        <TextField hiddenLabel value={metadata.r} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("r", e)}/>

        <Divider />
        
    
    </Box>
      
    )
}

export default DrawerComp

