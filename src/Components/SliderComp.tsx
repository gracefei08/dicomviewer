import { useState,useEffect,useMemo,useContext,useRef  } from 'react'
import { MetaDataListContext } from '../Context/DataContext';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MetaData,initalValues} from '../utils';

const minDistance = 10;

interface SliderProps {
  metadata:MetaData,

  stateFlag:boolean,
  setStateFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const SliderComp: React.VFC<SliderProps> = ({metadata,setStateFlag}) => {
  
  const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);

  const [max, setMax] =  useState<number>(metadata.max_slice);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setStateFlag(true)
    
    //let [temp1,temp2] =  [metadata.start_slice,metadata.end_slice]
    if (activeThumb === 0) {
 
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: Math.min(newValue[0], metadata.end_slice - minDistance),
            end_slice:metadata.end_slice,
            ci: Math.max(metadata.ci, Math.min(newValue[0], metadata.end_slice - minDistance))
          }
        }
        
        else return object;
      }))

    } else {
      //setValue([temp1, Math.max(newValue[1], temp1 + minDistance)]);
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadata.id) {
          return {
            ...object,
            start_slice: metadata.start_slice,
            end_slice: Math.max(newValue[1], metadata.start_slice + minDistance),
            ci: Math.min(metadata.ci, Math.max(newValue[1], metadata.start_slice + minDistance))
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