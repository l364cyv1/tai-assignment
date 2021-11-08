import './App.css'
import { Routes, Route } from "react-router-dom";
import NoMatch from './features/404/404';
import ItemsContainer from './features/items/ItemsContainer';
import { useAppSelector } from './app/hooks';
import ItemDetailsContainer from './features/itemDetails/ItemDetailsContainer';

function App() {
    const { error, message } = useAppSelector(state => state.error);
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<ItemsContainer/>}
                />
                <Route
                    path='/items/:id'
                    element={<ItemDetailsContainer/>}
                />
                <Route path="*" element={<NoMatch />} />
            </Routes>
            { error && <div className="error-notification">{ message }</div> }
        </>
    )
}

export default App
