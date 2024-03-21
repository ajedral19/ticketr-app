import { Fragment, useEffect, useRef, useState } from "react";
import { CheckBox, Select, Text } from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { edit, save } from "../../Redux/Slices/ticket";
import cn from "classnames";
import style from "./Form.module.sass";
import { handleOnCheck } from "../../Utils";
import { option_displays, option_types } from "../../static";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ListForm from "./ListForm";
import Preview from "../Preview";

const TicketForm = ({ defaultValues }) => {
    const formInit = {
        ticketNumber: "",
        ticketTitle: "",
        ticketType: "",
        directive: "",
        displays: [],
        editing: false,
    };

    const [init, setInit] = useState(formInit);

    let formMethods = useForm({ defaultValues: init });

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = formMethods;

    const dispatch = useDispatch();
    const selector = useSelector((state) => state.ticket);

    const triggeEditMode = (e) => {
        e.preventDefault();
        dispatch(edit({ editing: true }));
    };

    const handleOnSubmit = (data) => {
        dispatch(save(data));
        return;
    };

    useEffect(() => {
        setInit(defaultValues);
        console.log(defaultValues);
        // formMethods = useForm({ defaultValues: formInit });
    }, [defaultValues]);

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <div className={cn("tickt-info")}>
                    {/* <form onSubmit={handleOnSubmit}> */}
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="mb-1">
                            <div className="flex">
                                <div className="flex__col col-12">
                                    <div className="flex">
                                        <div className="flex__col col-3 sm-4">
                                            <Text
                                                name="ticketNumber"
                                                label="ticket number"
                                                className={cn(style.in_ticket)}
                                                register={register}
                                                required="Ticket Number is required"
                                                errors={errors}
                                                setValue={setValue}
                                                defaultValue={defaultValues?.ticketNumber}
                                            />
                                        </div>
                                        <div className="flex__col col-9 sm-4">
                                            <Text
                                                name="ticketTitle"
                                                label="title"
                                                className={cn(style.in_title)}
                                                register={register}
                                                required="Ticket Name/Title is required"
                                                errors={errors}
                                                setValue={setValue}
                                                defaultValue={defaultValues?.ticketTitle}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex__col col-12">
                                    <Select
                                        name="ticketType"
                                        label="type"
                                        data={option_types}
                                        register={register}
                                        required="Ticket Type is required"
                                        errors={errors}
                                        control={control}
                                        setValue={setValue}
                                        defaultValue={defaultValues?.ticketType}
                                    />
                                </div>
                                <div className="flex__col col-12">
                                    <Text
                                        type="textarea"
                                        name="directive"
                                        label="directive"
                                        register={register}
                                        defaultValue={defaultValues?.directive}
                                        setValue={setValue}
                                    />
                                    {/* <Text type="textarea" name="ticket_description" label="description" onChange={handleOnChange} form={ticketForm} /> */}
                                </div>

                                <div className="flex__col col-12">
                                    {option_displays && (
                                        <Fragment>
                                            <label className="mb-1 block t-up">Displays in</label>
                                            <div className="flex fit">
                                                {option_displays.map((view, key) => (
                                                    <div className="flex__col" key={key}>
                                                        <CheckBox
                                                            id={`cb_${view}`}
                                                            label={view}
                                                            value={view}
                                                            name="displays"
                                                            register={register}
                                                            defaultValue={defaultValues?.displays}
                                                            setValue={setValue}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <div className="flex__col col-12">
                                    <div className="flex fit">
                                        {selector.editing && (
                                            <div className="flex__col">
                                                <button type="submit">save</button>
                                            </div>
                                        )}

                                        {!selector.editing && (
                                            <div className="flex__col">
                                                <button type="button" onClick={triggeEditMode}>
                                                    edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </FormProvider>
            <div className="flex">
                <div className="flex__col col-4">
                    <ListForm />
                </div>
                <div className="flex__col col-8">
                    <Preview />
                </div>
            </div>
        </Fragment>
    );
};

export default TicketForm;
