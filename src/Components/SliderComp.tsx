import { useState,useEffect,  } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MetaData } from '../utils';

const minDistance = 1;

interface SliderProps {
  metadata: MetaData,
  metaDataList:MetaData[],
  setMetaDataList: React.Dispatch<React.SetStateAction<MetaData[]>>,
  stateFlag:boolean,
  setStateFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const SliderComp: React.VFC<SliderProps> = ({metadata,metaDataList,setMetaDataList,setStateFlag}) => {
  const [max, setMax] =  useState<number>(metadata.end_slice);

  const [value, setValue] = useState<number[]>([metadata.start_slice, metadata.end_slice]);

  //useEffect(()=>{

   // setValue([metadata.start_slice, metadata.end_slice])

  //},[metaDataList])

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setStateFlag(true)
    
    let [temp1,temp2] = value
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], temp2 - minDistance), temp2]);
      console.log('starting',Math.min(newValue[0], temp2 - minDistance))
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: Math.min(newValue[0], temp2 - minDistance),
            end_slice:temp2,
            ci: Math.max(metadata.ci, Math.min(newValue[0], temp2 - minDistance))
          }
        }
        
        else return object;
      }))

    } else {
      setValue([temp1, Math.max(newValue[1], temp1 + minDistance)]);
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: temp1,
            end_slice: Math.max(newValue[1], temp1 + minDistance),
            ci: Math.min(metadata.ci, Math.max(newValue[1], temp1 + minDistance))
          }
        }
        else return object;
      }))
    }

  };

  return (
    <>
    <Box sx={{ width: 300 }} >
      <Slider
        value={[metadata.start_slice,metadata.end_slice]}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        max={max}
        min={1}
      />

    </Box>
    </>
  );
}
export default SliderComp