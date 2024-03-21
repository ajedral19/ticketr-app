import { Fragment, useEffect, useState } from "react";
import cn from "classnames";
import Text from "./Text";

const Select = ({
    type,
    className,
    name,
    label,
    data,
    register,
    errors,
    id,
    placeholder,
    hideLabel,
    setter,
    ref,
    prop,
    required,
    labelAsPlaceholder = false,
}) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState(data);
    const [showOptions, setShowOptions] = useState(false);

    const onSelect = (e) => {
        setSelected(e.target.dataset.value);
        setShowOptions(false);
    };

    const onDropDown = () => {
        setShowOptions((status) => {
            if (!status) setOptions(data);
            return !status;
        });
    };

    const onChange = (e) => {
        const target = e.target;
        const value = target.value;

        setShowOptions(true);

        if (value) {
            const filtered = options.filter((item) => item.split(" ").join("").toLowerCase().includes(value.split(" ").join("").toLowerCase()));
            setOptions(filtered);
        } else {
            setOptions(data);
        }
    };

    return (
        <Fragment>
            <div className={cn("select", className)}>
                <Text
                    name={name}
                    label={label}
                    className={cn("fluid inline", className)}
                    required="Ticket Type is required"
                    errors={errors}
                    onChange={onChange}
                    onClick={onDropDown}
                    register={register}
                    value={selected}
                />
                <ul className={cn("select__options", { ["open"]: showOptions })}>
                    {options ? (
                        options.map((item, key) => (
                            <li key={key} onClick={onSelect} className="select__options__option" data-value={item}>
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="select__options__option">no data</li>
                    )}
                </ul>
            </div>
        </Fragment>
    );
};

export default Select;
