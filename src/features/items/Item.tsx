import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { loading } from './itemSlice';
import Loader from '../loader/Loader';

const Item: FC<{
    id: number,
    name: string,
    imageUrl: string,
    dispatchLoaded: boolean,
}> = ({id, name, imageUrl, dispatchLoaded}) => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState(true);
    return (
        <div className="table-single-item">
            <Link className={"item-link image-wrapper"} to={`/items/${id}`} state={{ fromHome: true }}>
                <Loader loading={loading}/>
                <img src={imageUrl} alt={name} onLoad={() => setLoading(false)}/>
            </Link>
            <Link className={"item-link"} to={`/items/${id}`} state={{ fromHome: true }}>
                {id}: {name}
            </Link>
        </div>
    );
}

export default Item;
