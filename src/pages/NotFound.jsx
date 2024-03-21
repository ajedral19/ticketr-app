import { Fragment, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const NotFound = () => {
    const { ["*"]: param } = useParams();
    const [par, setPar] = useSearchParams()
    return (
        <Fragment>
            <h1>{param} Not Found - bubu</h1>
        </Fragment>
    );
};

export default NotFound;
