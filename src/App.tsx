import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';
import {useChromeStorageLocal} from 'use-chrome-storage';
import { generateMetaData,generateURL } from './utils';
import CopyToClipboardButtonComp from './Components/CopyToClipboardButtonComp';


function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal("PAC_DATA", []);
  console.log(value)
  //let a = value.reduce((pS, cS) => [...pS, cS.instances.reduce((pV, cV) => [...pV, cV.url], [])], [])
  let metaDataList = generateMetaData(value)

  console.log(metaDataList)
  return (
    <div>
      <HeaderComp></HeaderComp>
      <Divider />
      <Button variant="outlined">Outlined</Button>
      <tbody>
                    {metaDataList && metaDataList.map( metadata=> 
                        <div>{generateURL(metadata)}
                        <CopyToClipboardButtonComp/>
                        </div> 
                        
                    )}
                </tbody>

    </div>
  );
}

export default App;

