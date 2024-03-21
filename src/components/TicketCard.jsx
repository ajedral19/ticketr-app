import { Fragment } from "react";
import { excerpt, getUsersName } from "../Utils";
import cn from "classnames";
import style from "./Styles/TicketCard.module.sass";
import { Link, useLocation } from "react-router-dom";
import StatusTag from "./StatusTag";

const TicketCard = ({ ticket }) => {
    let { pathname } = useLocation();

    return (
        <Fragment>
            {ticket && (
                <div className={cn("pane", style.card, [style[ticket.status?.split(" ").join("_").toLowerCase()]])}>
                    <Link to={`item/${ticket.id}`}>
                        <h3 className="title-4">{ticket?.id}</h3>
                        <p>{excerpt(ticket.directive, 6)}</p>
                    </Link>
                    <div className={cn(style.info)}>
                        <p className="t-cap pair">
                            <span className={cn("dim")}>by</span>
                            <Link to="/">{getUsersName(ticket.author)}</Link>
                        </p>
                        <p className="t-cap pair">
                            <span className={cn("dim")}>assignee</span>
                            <Link to="/">{getUsersName(ticket.assignee)}</Link>
                        </p>
                    </div>
                    <StatusTag text={ticket.status} status={ticket?.status.split(" ").join("_").toLowerCase()} />
                </div>
            )}
        </Fragment>
    );
};

export default TicketCard;
