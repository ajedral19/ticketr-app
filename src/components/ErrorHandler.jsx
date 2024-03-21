import { Fragment } from "react";
import cn from "classnames";
// import style from "./Styles/ErrorHandler.module.sass";

const ErrorHandler = ({ children }) => {
    return (
        <Fragment>
            <div className={cn()}>
                <div className="panel">{children}</div>
            </div>
        </Fragment>
    );
};

export default ErrorHandler;
