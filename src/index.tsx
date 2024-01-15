
import { render } from 'react-dom';
import './index.css';
import { DataProvider } from './Context/DataContext';
import App from './App';



const rootElement = document.getElementById('root');
render(
    <DataProvider>
    <App /></DataProvider>,

    rootElement
);

