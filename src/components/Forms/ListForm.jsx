import { Fragment, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { CheckBox, Text } from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { generateListId } from "../../Utils";
import { appendToList } from "../../Redux/Slices/ticket";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";

const ListForm = ({ className, setter, displayOptions = [] }) => {
    const formInit = {
        displays: [],
        directive: "",
        filePath: [],
        screenshot: [],
    };

    const formMethods = useForm({ defaultValues: formInit });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = formMethods;

    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.ticket);

    const submit = (data) => {
        dispatch(appendToList({ id: generateListId(6, "id"), data }));
    };

    const handleCheck = (e) => {
        console.log(e.target.value);
    };

    // watch list are filepath and screenshot
    const handleOnChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        const type = e.target.type;
        const isChecked = e.target.checked;
        setter((cur) => {
            if (type == "checkbox") {
                if (!isChecked) {
                    return { ...cur, [key]: cur[key].filter((item) => item !== value) };
                } else {
                    return { ...cur, [key]: cur[key] ? [...cur[key], value] : [value] };
                }
            }
            return { ...cur, [key]: value };
        });
    };

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={cn(className)}>
                        {/* add checkbox to option */}

                        {ticket.displays &&
                            ticket.displays.map((item, key) => (
                                <CheckBox
                                    key={key}
                                    id={`list_${item}`}
                                    label={item}
                                    value={item}
                                    name="displays"
                                    register={register}
                                    onChange={handleOnChange}
                                />
                            ))}

                        <Text type="textarea" name="directive" label="directive" register={register} onChange={handleOnChange} />
                        <div className="flex">
                            <div className="flex__col">
                                {/* <Text name="filepath" label="File Path" placeholder="enter url or file path" onChange={handleOnChange} /> */}
                                <Text name="filePath" label="file path/s" register={register} onChange={handleOnChange} />
                            </div>
                            <div className="flex__col">
                                {/* <Text name="screenshot" label="Screen Capture (URL)" placeholder="enter url" onChange={handleOnChange} /> */}
                                <Text name="screenshot" label="screenshot/s" register={register} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-1">
                        <div className="flex">
                            <div className="flex__col">
                                <button className="fluid inline" type="reset" onClick={handleSubmit}>
                                    clear
                                </button>
                            </div>
                            <div className="flex__col">
                                <button className="fluid inline" type="submit">
                                    append
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Fragment>
    );
};

export default ListForm;
