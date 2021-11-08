import { CSSTransition } from 'react-transition-group';
import './Loader.scss';
import { FC, useRef } from 'react';

const Loader: FC<{
    loading: boolean;
}> = ({loading}) => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition nodeRef={nodeRef} in={loading} unmountOnExit timeout={100} classNames="loader-animation">
            <div ref={nodeRef} className="loader-wrapper">
                <div className="loader">Loader...</div>
            </div>
        </CSSTransition>
    )
}

export default Loader;
