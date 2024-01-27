import { useState,useEffect,useMemo,useContext  } from 'react'
import { MetaDataListContext } from '../Context/DataContext';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MetaData,initalValues} from '../utils';

const minDistance = 10;

interface SliderProps {
  metadataId: number,

  stateFlag:boolean,
  setStateFlag:React.Dispatch<React.SetStateAction<boolean>>,
}

const SliderComp: React.VFC<SliderProps> = ({metadataId,setStateFlag}) => {
  
  const {metaDataList,setMetaDataList}  = useContext(MetaDataListContext);
  //const [value, setValue] = useState<number[]>([metadata.start_slice, metadata.end_slice]);

  //useEffect(()=>{
  //  console.log('meta',metadata)
   //setValue([metadata.start_slice, metadata.end_slice])

  //},[metaDataList])
  const [max, setMax] =  useState<number>(0);
  const [metadata, setMetadata] =  useState<MetaData>(initalValues);
  useMemo(() => {
    // @ts-ignore
    setMetadata(metaDataList.find(x => x.id ===metadataId))
    setMax(metadata.max_slice)
},[metaDataList])

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setStateFlag(true)
    
    let [temp1,temp2] =  [metadata.start_slice,metadata.end_slice]
    if (activeThumb === 0) {
      //setValue([Math.min(newValue[0], temp2 - minDistance), temp2]);
      //console.log('starting',Math.min(newValue[0], temp2 - minDistance))
      setMetaDataList([...metaDataList].map(object => {
        if(object.id === metadataId) {
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
        if(object.id === metadataId) {
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