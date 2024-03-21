import { Fragment } from "react";
import cn from "classnames";

const Thumbnail = ({ img, className, controlElement, name = "test name" }) => {
    return (
        <Fragment>
            <div className={cn("thumbnail", className)}>
                {controlElement}
                <span className="thumbnail__img-wrap">
                    <img src={img} alt={name} className="img" />
                </span>
                {/* {name && <p>{name}</p>} */}
            </div>
        </Fragment>
    );
};

export default Thumbnail;
