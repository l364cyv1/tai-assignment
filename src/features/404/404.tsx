import { Link } from 'react-router-dom';
import './404.scss';

const NoMatch = () => {
    return (
        <div className={"page-404"}>
            Ooops... Page cannot be found. <br/>
            <Link to="/">Home</Link>
        </div>
    )
};

export default NoMatch;
