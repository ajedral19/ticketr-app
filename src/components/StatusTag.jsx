import { Fragment } from "react";
import cn from "classnames";
import style from "./Styles/StatusTag.module.sass";

const StatusTag = ({ text, status }) => {
    return (
        <Fragment>
            <span className={cn("tag", style.status, [style[status]])}>{text}</span>
        </Fragment>
    );
};

export default StatusTag;
