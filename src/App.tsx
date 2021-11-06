import './App.css'
import { Routes, Route } from "react-router-dom";
import NoMatch from './features/404/404';
import ItemsContainer from './features/items/ItemsContainer';
import ItemDetails from './features/itemDetails/itemDetails';

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<ItemsContainer/>}
            />
            <Route
                path='/items/:id'
                element={<ItemDetails/>}
            />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

export default App
