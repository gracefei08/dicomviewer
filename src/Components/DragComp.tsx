

import { MetaData} from '../utils';
import * as React from 'react';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import { useDrag } from 'react-dnd';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


interface DragCompProps {
    metadata: MetaData,
    metaDataList: MetaData[],
    setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>
}

const DragComp: React.VFC<DragCompProps> = ({ metadata,metaDataList,setMetaDataList }) => {
    
    const [{isDragging},drag] = useDrag(()=>({

        type:"card",
        item:{id:metadata.id},
        collect:((monitor:any)=>({
            isDragging:!!monitor.isDragging()
        }))
    }))

    const resetPosition = ()=>{
        setMetaDataList([...metaDataList].map(object => {
            if(object.id === metadata.id) {
              return {
                ...object,
                cord:[-1,-1]
              }
            }
            
            else return object;
          }))
        }

    return (
        <Card sx={{ width: 80, height:60 }} ref={drag}>
            <CardHeader
  
        action={
            <IconButton  size="small" onClick = {()=>resetPosition()} >
            <CloseIcon style={{ fontSize: 10 }}/>
            
          </IconButton>
        }
        title={metadata.label}
        titleTypographyProps={{variant:'body2' }}

      />

        </Card>

    )
}

export default DragComp

