import { Fragment, useEffect, useState } from "react";
import cn from "classnames";
import Text from "./Text";
import { useWatch } from "react-hook-form";

const Select = ({
    className,
    name,
    data,
    label,
    id,
    placeholder,
    hideLabel,
    setter,
    ref,
    prop,
    register,
    required,
    control,
    setValue,
    errors,
    defaultValue,
    labelAsPlaceholder = false,
}) => {
    const [selected, setSelected] = useState("");
    const [options, setOptions] = useState(data);
    const [showOptions, setShowOptions] = useState(false);

    const onSelect = (e) => {
        setSelected(e.target.dataset.value);
        setShowOptions(false);
        setValue(name, e.target.dataset.value);
    };

    const onDropDown = () => {
        setShowOptions((status) => {
            if (!status) setOptions(data);
            return !status;
        });
    };

    const myVal = useWatch({ control, name });

    useEffect(() => {
        if (myVal) {
            const filtered = options.filter((item) => {
                item == "string"
                    ? item.split(" ").join("").toLowerCase().includes(myVal.split(" ").join("").toLowerCase())
                    : item.name.split(" ").join("").toLowerCase().includes(myVal.split(" ").join("").toLowerCase());
            });
            setOptions(filtered);
        } else {
            setOptions(data);
        }
    }, [myVal]);

    useEffect(() => {
        setValue && setValue(name, defaultValue);
    }, [defaultValue]);

    return (
        <Fragment>
            <div className={cn("select", className)}>
                <div className="input input--text fluid inline">
                    {!hideLabel && label && (
                        <label className="input__label" htmlFor={name}>
                            {label}
                        </label>
                    )}
                    <input
                        name={name}
                        className="input__field"
                        autoComplete="off"
                        onClick={onDropDown}
                        aria-invalid={errors && errors[name] ? "true" : "false"}
                        defaultValue={defaultValue}
                        {...register(name, { required })}
                    />
                </div>
                <ul className={cn("select__options", { ["open"]: showOptions })}>
                    {options ? (
                        options.map((item, key) => (
                            <li key={key} onClick={onSelect} className="select__options__option" data-value={typeof item == "string" ? item : item?.id}>
                                {typeof item == "string" ? item : item?.name}
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
