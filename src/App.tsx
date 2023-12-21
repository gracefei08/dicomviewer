import Button from '@mui/material/Button';
import HeaderComp from './Components/HeaderComp';
import Divider from '@mui/material/Divider';

function App() {
  return (
    <div>
      <HeaderComp></HeaderComp>
      <Divider />
      <Button variant="outlined">Outlined</Button>
    </div>
  );
}

export default App;
