import { Fragment, useEffect, useState } from "react";
import cn from "classnames";
import { useWatch } from "react-hook-form";

// type (text, email, password, textarea)
const Text = ({
    type,
    className,
    name,
    label,
    hideLabel = false,
    labelAsPlaceholder = false,
    placeholder,
    onChange,
    onClick,
    required,
    register,
    defaultValue,
    errors,
    value,
    setValue,
    focused,
}) => {
    useEffect(() => {
        setValue && setValue(name, defaultValue);
    }, [defaultValue]);

    return (
        <Fragment>
            <span className={cn("input input--text", className)}>
                {!hideLabel && label && (
                    <label className="input__label" htmlFor={name}>
                        {label}
                    </label>
                )}
                {register ? (
                    type === "textarea" ? (
                        <textarea
                            id={name}
                            type={type || "text"}
                            className="input__field"
                            defaultValue={defaultValue}
                            placeholder={labelAsPlaceholder ? label : placeholder}
                            aria-invalid={errors && errors[name] ? "true" : "false"}
                            value={value}
                            {...register(name, { required })}
                            onChange={onChange}
                            autoFocus={focused}
                        ></textarea>
                    ) : (
                        <input
                            id={name}
                            type={type || "text"}
                            autoComplete="off"
                            className="input__field"
                            defaultValue={defaultValue}
                            placeholder={labelAsPlaceholder ? label : placeholder}
                            aria-invalid={errors && errors[name] ? "true" : "false"}
                            value={value}
                            {...register(name, { required })}
                            onChange={onChange}
                            autoFocus={focused}
                        />
                    )
                ) : type === "textarea" ? (
                    <textarea
                        id={name}
                        type={type || "text"}
                        className="input__field"
                        defaultValue={defaultValue}
                        placeholder={labelAsPlaceholder ? label : placeholder}
                        aria-invalid={errors && errors[name] ? "true" : "false"}
                        value={value}
                        autoFocus={focused}
                        onChange={onChange}
                    ></textarea>
                ) : (
                    <input
                        id={name}
                        type={type || "text"}
                        autoComplete="off"
                        className="input__field"
                        defaultValue={defaultValue}
                        placeholder={labelAsPlaceholder ? label : placeholder}
                        aria-invalid={errors && errors[name] ? "true" : "false"}
                        value={value}
                        autoFocus={focused}
                        onChange={onChange}
                    />
                )}
            </span>
        </Fragment>
    );
};

export default Text;
