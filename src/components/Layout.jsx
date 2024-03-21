import { Fragment } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Navbar container />
            <main>
                <div className="container">{children}</div>
            </main>
            <div className="container">
                <footer>
                    <h2>Some footer</h2>
                </footer>
            </div>
        </Fragment>
    );
};

export default Layout;
