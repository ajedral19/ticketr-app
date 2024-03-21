import { Fragment } from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
    return (
        <Fragment>
            <div className="panel">
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tickets">Tickets</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/members">Members</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/teams">Teams</Link>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};

export default DashboardMenu;
