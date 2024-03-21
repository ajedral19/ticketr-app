import { Fragment, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { Checklist, ErrorHandler, Ticket as TicketProp } from "../../components";
import { getTicketData } from "../../Utils";

const Ticket = ({ origin }) => {
    const [data, setData] = useState(null);
    const param = useParams();
    const [searchParams] = useSearchParams();
    const [requestTimeout, setRequestTimeout] = useState(false);
    const [invalidRequest, setInvalidRequest] = useState(false);
    const navigate = useNavigate();
    // const [tickets] = useOutletContext()

    // console.log(tickets[0])
    // searchParams.get("id")

    // console.log(param.id);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (param.id) {
            getTicketData(param.id, setData, signal);
            // getTicketData(searchParams.get("id"), setData, signal);
        } else {
            setInvalidRequest(true);
        }

        return () => controller.abort();
    }, []);

    // useEffect(() => {
    //     let timeout;
    //     timeout = setTimeout(() => {
    //         if (!data) {
    //             setRequestTimeout(true);
    //         }
    //         clearTimeout(timeout);
    //     }, 5000);
    // }, []);

    const triggerBack = () => {
        navigate(origin || "/dashboard/tickets");
    };
    return (
        <Fragment>
            {/* <button className="mb-1" type="button" onClick={triggerBack}>
                go back
            </button> */}
            {data ? (
                <Fragment>
                    <TicketProp data={data} setData={setData} />
                    <Checklist data={data} setData={setData} />
                </Fragment>
            ) : requestTimeout ? (
                <ErrorHandler>
                    <h3>request timeout</h3>
                    <h2>wasn't able to fetch the data</h2>
                    <h2>try refreshing the page</h2>
                </ErrorHandler>
            ) : invalidRequest ? (
                <ErrorHandler>
                    <h2>no data to be fetched</h2>
                </ErrorHandler>
            ) : (
                <h1 className="title-1">loading...</h1>
            )}
        </Fragment>
    );
};

export default Ticket;
