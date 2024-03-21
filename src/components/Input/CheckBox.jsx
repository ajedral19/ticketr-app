import { Fragment, useEffect, useState } from "react";

const Checkbox = ({ id, label, value, register }) => {
    const id_name = id
        .split(/[.\-=/_]/)
        .join("_")
        .toLowerCase();

    return (
        <Fragment>
            <div className="input">
                <input
                    type="checkbox"
                    id={id_name}
                    value={typeof value == "string" ? value.toLowerCase() : value}
                    className="control"
                    {...register("displays")}
                />
                {label && (
                    <label className="input__label" htmlFor={id_name}>
                        {label}
                    </label>
                )}
            </div>
        </Fragment>
    );
};

export default Checkbox;
