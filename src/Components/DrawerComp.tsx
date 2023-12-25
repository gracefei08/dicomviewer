import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'

import TextField from '@mui/material/TextField';
import SliderComp from './SliderComp';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MetaData,generateMetaData, generateURL  } from '../utils';
import Divider from '@mui/material/Divider';
import CopyToClipboardButtonComp from './CopyToClipboardButtonComp';



interface DrawerCompProps {
    metadata: MetaData,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
  setDrawerState:React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerComp: React.VFC<DrawerCompProps>  = ({metadata,metaDataList,setMetaDataList,setDrawerState}) => {
    const [open, setOpen] = useState(false)
    const [url, setURL] = useState<string>("Click Generate URL");
    
    return (
        <Box
        sx={{ width:350 }}
        role="presentation"
        
       
      >
      
      <IconButton aria-label="delete" size="small" onClick = {()=>setDrawerState(false)}>
        <CloseIcon />
        
      </IconButton>
      <Typography>{metadata.label}</Typography>
      <Divider />

        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <SliderComp metadata={metadata} metaDataList={metaDataList} setMetaDataList={setMetaDataList}/>
        <Divider />

        <Button variant="contained" onClick = {()=>setURL(generateURL((metaDataList.filter(function(element){ return element.id>= metadata.id; }))[0]))}>Generate URL</Button>
        <div>
      
          {url }
          
          <CopyToClipboardButtonComp url={url}/>
        
        </div>
      </Box>
      
    )
}

export default DrawerComp

