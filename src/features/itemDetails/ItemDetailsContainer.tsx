import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { fetchItemDetails } from './itemDetailsSlice';
import Loader from '../loader/Loader';
import './ItemDetails.scss';
import ItemDetails from './itemDetails';

const ItemDetailsContainer = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { data } = useAppSelector(state => state.itemDetails);
    const [itemLoading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchItemDetails(id));
    }, [id]);

    return (
        <div className="item-details-container">
            <Loader loading={itemLoading}/>
            <>
                <button onClick={() => navigate('/')}>
                {
                    location.state?.fromHome ? 'GO BACK' : 'GO HOME'
                }
                </button>
                <ItemDetails {...data} onLoad={() => setLoading(false)}/>
            </>
        </div>
    );
}

export default ItemDetailsContainer;
