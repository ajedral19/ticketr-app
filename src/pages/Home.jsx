import { Fragment } from "react";
import { Dashboard } from "./Dasboard";
import { Button } from "../components";

const Home = () => {
    return (
        <Fragment>
            <Button text="Default" />
            <Button variant="primary" text="Primary" />
            <Button variant="secondary" text="Secondary" />
            <Button variant="danger" text="Danger" />
            <Button variant="disabled" text="Disabled" />
        </Fragment>
    );
};

export default Home;
