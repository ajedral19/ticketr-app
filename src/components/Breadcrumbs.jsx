import { Fragment } from "react";
import cn from "classnames";
import style from "./Styles/Breadcrumbs.module.sass";
import { useNavigate, useParams } from "react-router";

const Breadcrumbs = () => {
    const navigate = useNavigate();
    const { param } = useParams();

    const stepBack = () => {
        navigate("/");
    };

    return (
        <Fragment>
            <div className={cn(style.breadcrumbs)}>
                <button onClick={stepBack}>go back</button>
            </div>
        </Fragment>
    );
};

export default Breadcrumbs;
