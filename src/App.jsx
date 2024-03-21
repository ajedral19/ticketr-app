import { Fragment, useEffect, useState } from "react";
import "./styles/global.sass";
import Routers from "./Routers";
import { Modal } from "./components";
import { useDispatch } from "react-redux";
import { distribute } from "./Redux/Slices/dataDist";
import { getTicketData } from "./Utils";

function App() {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getTicketData(null, setData, signal);
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (data) dispatch(distribute(data));
    }, [data]);

    // dispatch(distribute)

    return (
        <Fragment>
            <Modal />
            <Routers />
        </Fragment>
    );
}

export default App;
