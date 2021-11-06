import { FC } from 'react';

const Item: FC<{
    id: number,
    name: string,
}> = ({id, name}) => {
    return (
        <div>{id}: {name}</div>
    );
}

export default Item;
