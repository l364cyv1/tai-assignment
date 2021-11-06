import { CSSTransition } from 'react-transition-group';
import './Loader.scss';

const Loader = () => {
    return (
        <CSSTransition timeout={200} classNames="my-node">
            <div className="loader">Loader...</div>
        </CSSTransition>
    )
}

export default Loader;
