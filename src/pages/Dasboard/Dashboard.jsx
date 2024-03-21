import { Fragment, useEffect, useState } from "react";
import { Dashboard as DashboardProp, DashboardMenu, ErrorHandler, Breadcrumbs } from "../../components";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const Dashboard = ({ children, jsx }) => {
    const { ["*"]: param } = useParams();
    const [tickets, setTickets] = useState(null);
    const [curLoc, setCurLoc] = useState(param);
    const selector = useSelector((state) => state.dataDist);

    useEffect(() => {
        setTickets(selector.tickets);
    }, [selector]);



    return (
        <Fragment>
            <div className="flex">
                <div className="flex__col col-3">
                    <DashboardMenu />
                </div>
                <div className="flex__col col-9">
                    {/* <Breadcrumbs /> */}
                    {/* <h1>Hello</h1> */}
                    <Outlet context={[tickets]} />
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
