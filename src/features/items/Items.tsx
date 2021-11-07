import Item from './Item';
import { FC, useEffect, useRef } from 'react';
import './Items.scss';
import { ItemInterface } from '../../app/interfaces';

const Items: FC<{
    items: ItemInterface[],
}> = ({items}) => {
    if (items.length === 0) {
        return <p>No characters could be found.</p>;
    }
    return (
        <>
            <table>
                <tbody>
                    { items.map((item, index, arr) => {
                        return (
                            <tr key={ item.id }>
                                <td>
                                    <Item id={ item.id } name={ item.name } imageUrl={ item.image } dispatchLoaded={index + 1 === arr.length}/>
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
        </>
    );
}

export default Items;
