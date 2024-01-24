import { Button } from '@mui/material'
import { useState,useEffect, useMemo } from 'react'
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
    metadataId: number,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
  setDrawerState:React.Dispatch<React.SetStateAction<boolean>>
}
const initalValues = {
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
  pad:0,
  cord:[-1,-1]
}

const DrawerComp: React.VFC<DrawerCompProps>  = ({metadataId,metaDataList,setMetaDataList,setDrawerState}) => {
    const renderingEngine  = useContext(DataContext);
    const [metadata, setMetadata] =  useState<MetaData>(initalValues);
    
    useMemo(() => {
      console.log(metaDataList.find(x => x.id ===metadataId))
       // @ts-ignore
      setMetadata(metaDataList.find(x => x.id ===metadataId) )
    },[metaDataList])

    const saveStates = ((key:string, event: React.ChangeEvent<HTMLInputElement>)=>{
        setMetaDataList([...metaDataList].map(object => {
            if(object.id === metadataId) {
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
      <div style={{height: "400px"}}>
      {renderingEngine?<Viewport metadata={metadata} metaDataList={metaDataList} setMetaDataList ={setMetaDataList}/>:null}
      
      </div>

      <Divider />

        <Typography>Slice Range</Typography>
        <SliderComp metadata={metadata} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
        <Typography>WW</Typography>
        <TextField hiddenLabel value={metadata.ww} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ww", e)}/>
        <Typography>WC</Typography>
        <TextField hiddenLabel value={metadata.wc} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("wc", e)}/>
        <Typography>Ci</Typography>
        <TextField hiddenLabel value={metadata.ci} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("ci", e)}/>
        <Typography>z</Typography>
        <TextField hiddenLabel value={metadata.z} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("z", e)}/>
        <Typography>px</Typography>
        <TextField hiddenLabel value={metadata.px} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("px", e)}/>
        <Typography>py</Typography>
        <TextField hiddenLabel value={metadata.py} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("py", e)}/>
        <Typography>r</Typography>
        <TextField hiddenLabel value={metadata.r} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveStates("r", e)}/>

        <Divider />
    
    {/** 
        <Button variant="contained" onClick = {()=>setURL(generateURL((metaDataList.filter(function(element){ return element.id>= metadata.id; }))[0]))}>Generate URL</Button>
    
      
          {url }
          
          <CopyToClipboardButtonComp url={url}/>*/}
        
    
    </Box>
      
    )
}

export default DrawerComp

