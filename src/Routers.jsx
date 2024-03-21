import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About, Home, NotFound } from "./pages";
import { Dashboard, Members, Teams, Ticket, Tickets } from "./pages/Dasboard";
import { ForgotPassword, Login, Register } from "./pages/Auth";
import { Fragment, useEffect, useState } from "react";
import { Navbar, TicketForm } from "./components";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

export default function Routers() {
    const [tickets, setTickets] = useState(null);
    const selector = useSelector((state) => state.dataDist);
    useEffect(() => {
        setTickets(selector.tickets);
    }, [selector]);

    return (
        <Fragment>
            <Router>
                <Routes>
                    {/* faces */}
                    <Route handle={"home"} path="/" exact element={<Layout><Home /></Layout>} />
                    <Route handle={"about"} path="/about" element={<Layout><About /></Layout>} />

                    {/* dasboard */}
                    <Route path="dashboard" element={<Layout><Dashboard /></Layout>}>
                        {/* tickets */}
                        <Route path="tickets" loader={tickets} element={<Tickets />} />
                        <Route path="tickets/register" element={<TicketForm />} />
                        <Route path="tickets/item/:id" element={<Ticket />} />
                        {/* members */}
                        <Route path="members" loader={tickets} element={<Members />} />
                        {/* teams */}
                        <Route path="teams" loader={tickets} element={<Teams />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="dashboard/:param/ticket"element={<Layout><Ticket /></Layout>} />

                    {/* ticket access */}
                    <Route path="/ticket" element={<Layout><Ticket /></Layout>} />
                    <Route path="/ticket/:id" element={<Layout><Ticket /></Layout>} />

                    {/* Auths */}
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/register" element={<Layout><Register /></Layout>} />
                    <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
                    <Route path="*" element={<Layout><NotFound /></Layout>} />
                </Routes>
            </Router>
        </Fragment>
    );
}
