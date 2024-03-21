import { Fragment, useState } from "react";
import cn from "classnames";
import style from "./Styles/QuickTool.module.sass";
import svg from "../assets/svg";
import { escapeListener } from "../Utils";

const QuickTool = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <Fragment>
            <div className={cn(style.quicktool)}>
                <button type="button" className="btn btn--icon-only" onClick={() => setToggle(!toggle)}>
                    {svg.icon_gear}
                </button>
                {toggle && (
                    <ul className={cn(style.quicktool_menu)}>
                        <li>
                            <button className={cn("fluid inline")}>item 1</button>
                        </li>
                        <li>
                            <button className={cn("fluid inline")}>item 2</button>
                        </li>
                        <li>
                            <button className={cn("fluid inline")}>item 3</button>
                        </li>
                    </ul>
                )}
            </div>
        </Fragment>
    );
};

export default QuickTool;
