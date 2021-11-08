interface ItemDetailInterface {
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    onLoad: () => void;
}

function ItemDetails ({ name, image, status, species, gender, onLoad }: ItemDetailInterface) {
    return (
        <div className="item-details-content">
            <h1>{name}</h1>
            <div className="item-details-image-holder">
                <img src={image} alt={name} onLoad={() => setTimeout(() => onLoad(), 300)}/>
            </div>
            <div className="item-details-meta">
                <p>Status: <span>{status}</span></p>
                <p>Species: <span>{species}</span></p>
                <p>Gender: <span>{gender}</span></p>
            </div>
        </div>
    )
}

export default ItemDetails;
