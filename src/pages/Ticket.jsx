import { Fragment, useEffect, useState } from "react";
import { Board } from "../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListForm, TicketForm } from "../components/Forms";
import { useDispatch, useSelector } from "react-redux";
import { generateListId, getTicketData } from "../Utils";
import Strip from "../components/Strip";
import Thumbnail from "../components/Thumbnail";
import { reveal } from "../Redux/Slices/modal";
import { save } from "../Redux/Slices/ticket";
import { appendItem } from "../Redux/Reducers/checkList";

const ticket = {
    ticketNo: "",
    title: "",
    description: "",
    author: "",
};

const listInit = {};

const Ticket = () => {
    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.ticket);

    const [previewData, setpreviewData] = useState({});
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    // const [saerchParams] = useSearchParams();
    // console.log(saerchParams.getAll('id'))

    const handleOnStoreToDB = () => {
        navigate("/dashboard");
    };

    const [saerchParams] = useSearchParams();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getTicketData(saerchParams.get("id"), setData, signal);

        return () => controller.abort();
    }, [saerchParams]);

    useEffect(() => {
        console.log(data);
        dispatch(save(data))
        // dispatch(appendItem(data.checklist))
    }, [data]);

    return (
        <Fragment>
            <div className="container">
                <div className="mb-3">
                    <TicketForm defaultValues={data} />
                </div>

                {(!ticket.is_empty || data?.checklist) && (
                    <div className="flex">
                        <div className="flex__col col-4 sm-4">
                            <Board title="Add Item">
                                <ListForm setter={setpreviewData} displayOptions={ticket.displays} />
                            </Board>
                        </div>
                        <div className="flex__col col-5 sm-4">
                            <Board title="preview">
                                {previewData.displays?.length ? (
                                    <Fragment>
                                        <h5>Display's in</h5>
                                        <div className="flex fit mt-1 mb-1">
                                            {previewData.displays.map((display, key) => (
                                                <div key={key} className="flex__col">
                                                    <span className="tag">{display}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Fragment>
                                ) : null}
                                {previewData.directive && (
                                    <div className="text-block mt-1">
                                        <p>{previewData.directive}</p>
                                    </div>
                                )}

                                {previewData.filepath && (
                                    <Fragment>
                                        <div className="mt-2 mb-2">
                                            <h5>File Path{previewData.filepath.length > 1 ? "s" : ""}</h5>
                                            <ul className="list mt-1">
                                                <li>
                                                    <a href={previewData.filepath} target="_blank">
                                                        {previewData.filepath}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </Fragment>
                                )}

                                {previewData.screenshot && (
                                    <Fragment>
                                        <h5>Screenshot{previewData.screenshot.length > 1 ? "s" : ""}</h5>
                                        <div className="mt-1 mb-2">
                                            <div className="flex stretch">
                                                <div className="flex__col col-6">
                                                    <Thumbnail img={previewData.screenshot} />
                                                    {/* <img src={previewData.screenshot} width="300" alt="screenshot" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </Board>
                        </div>
                        <div className="flex__col sm-4">
                            <Board title="list" data={data.checklist || ticket.checklist} Component={Strip} />
                        </div>
                    </div>
                )}
                <div className="mt-3">
                    {/* trigger request and redirects to dashboard showing a preview of this ticket */}
                    <button type="button" onClick={handleOnStoreToDB}>
                        save
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Ticket;
