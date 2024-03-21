import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, Select, CheckBox } from "./Input";
import cn from "classnames";
import style from "./Styles/Ticket.module.sass";
import QuickTool from "./QuictTool";
import { useSelector } from "react-redux";
import { getValueById } from "../Utils";

const Ticket = ({ data, setData }) => {
    const formMethods = useForm({});
    const { register, control, handleSubmit, setValue, getValues } = formMethods;
    const [assignee, setAssignee] = useState(data?.assignee);
    const [editMode, setEditMode] = useState(false);

    const displayOptions = useSelector((state) => state.dataDist.defaults?.displays);
    const membersList = useSelector((state) => state.dataDist.defaults?.members);

    const triggerEdit = () => {
        setEditMode(true);
    };

    const triggerSave = () => {
        setEditMode(false);
    };

    const handleOnSubmit = (mod) => {
        triggerSave();
        if (setData) setData((cur) => ({ ...cur, ...mod, assignee }));
    };

    const getAssigneesName = (id) => {
        return membersList && membersList.find((member) => member.id == assignee);
    };

    useEffect(() => {
        const member = getAssigneesName(assignee);
        if (member) setAssignee(member.name);
    }, [membersList, assignee]);

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className={cn(style.ticket, "relative", "mb-1")}>
                        <div className={cn(style.ticket__head)}>
                            <div>
                                <h3 className={cn("title-5")}>
                                    {!editMode ? data?.id : <Text focused name="id" defaultValue={data?.id} register={register} setValue={setValue} />}
                                </h3>
                                <span
                                    className={cn(
                                        "tag mt-1",
                                        { ["tag--green"]: data?.status === "done" },
                                        { ["tag--red"]: data?.status === "closed" },
                                        { ["tag--orange"]: data?.status === "in progress" },
                                        { ["tag--yellow"]: data?.status === "pending" },
                                        { ["tag--blue"]: data?.status === "open" }
                                    )}
                                >
                                    {data?.status}
                                </span>
                            </div>
                            <div>
                                <p>
                                    <span>Number of items</span>
                                    {data?.checklist?.length}
                                </p>
                                <p className="mt-1">
                                    <a className="redirect mr-1" href="">
                                        Jira
                                    </a>
                                    <a className="redirect" href="">
                                        <span>Specs</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className={cn(style.ticket__body)}>
                            <h2 className={cn("title-5")}>
                                {!editMode ? data?.title : <Text name="title" defaultValue={data?.title} register={register} setValue={setValue} />}
                            </h2>
                            {!editMode ? (
                                data?.displays && (
                                    <div className="flex fit mt-1">
                                        {data?.displays.map((id, key) => (
                                            <div key={key} className="flex__col">
                                                <span className="tag">{getValueById(id, "displays")}</span>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : displayOptions ? (
                                <div className="flex fit mt-1">
                                    {displayOptions.map((display, key) => (
                                        <div className="flex__col" key={key}>
                                            <CheckBox
                                                name="display"
                                                value={display.id}
                                                label={display.value}
                                                id={`display-${display.id}`}
                                                register={register}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div className="flex fit mt-1 mb-1">
                                <p className="flex__col">
                                    <span className="mr-1 dim">Author:</span>
                                    {data?.author}
                                </p>
                                {data?.assignee &&
                                    (!editMode ? (
                                        <Fragment>
                                            <p className="flex__col">
                                                <span className="mr-1 dim">Assignee:</span>
                                                {assignee}
                                            </p>
                                        </Fragment>
                                    ) : (
                                        <Select
                                            name="assignee"
                                            label="assignee"
                                            data={membersList}
                                            control={control}
                                            register={register}
                                            setValue={setValue}
                                            defaultValue={assignee}
                                        />
                                    ))}
                                <QuickTool />
                            </div>
                            <p>{!editMode ? data?.directive : <Text type="textarea" name="directive" defaultValue={data?.directive} register={register} />}</p>
                        </div>
                    </div>
                    {editMode && <button type="submit">save</button>}
                </form>
            </FormProvider>
            {!editMode && (
                <button type="button" onClick={triggerEdit}>
                    edit
                </button>
            )}
        </Fragment>
    );
};

export default Ticket;
