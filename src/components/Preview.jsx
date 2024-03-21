import { Fragment } from "react";
import Thumbnail from "./Thumbnail";
import { FormProvider, set, useForm } from "react-hook-form";
import { Text } from "./Input";
import { Form } from "react-router-dom";
import Button from "./Button";

const Preview = ({ data, editMode, setEditMode }) => {
    const formMethods = useForm();
    const { register, control, handleSubmit, setValue } = formMethods;

    const triggerSave = (data) => {
        setEditMode(false);
        console.log(data);
    };

    const handleOnSubmit = (data) => {
        triggerSave(data);
    };

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    {data && (
                        <Fragment>
                            {data.value?.display.length && (
                                <div className="flex fit mb-2">
                                    {data.value?.display.map((item, key) => (
                                        <div key={key} className="flex__col">
                                            <span className="tag">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p>Directive</p>
                            {editMode ? (
                                <Text type="textarea" focused setValue={setValue} name="directive" defaultValue={data.value.directive} register={register} />
                            ) : (
                                <p className="mt-1">{data.value.directive}</p>
                            )}

                            {data.value?.filepaths.length && (
                                <Fragment>
                                    <div className="mt-2">
                                        <p>File paths</p>
                                        <ul className="mt-1">
                                            {data.value?.filepaths.map((item, key) => (
                                                <li key={key}>
                                                    {editMode ? (
                                                        <Text name="filepath" setValue={setValue} defaultValue={item} register={register} />
                                                    ) : (
                                                        <a href={item} target="_blank">
                                                            {item}
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Fragment>
                            )}

                            {data.value?.screenshots.length ? (
                                <Fragment>
                                    <div className="mt-2">
                                        <p>Screenshots</p>
                                        <div className="flex contained fit mt-1">
                                            {data.value?.screenshots.map((src, key) => (
                                                <div key={key} className="flex__col col-6 con-2">
                                                    {editMode && (
                                                        <Text name="screenshot" className="mb-1" setValue={setValue} defaultValue={src} register={register} />
                                                    )}
                                                    <Thumbnail controlElement={editMode && <Button text="remove" type="button" overlay />} img={src} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : null}
                        </Fragment>
                    )}
                    {editMode && <button type="submit">save</button>}
                </form>
            </FormProvider>
        </Fragment>
    );
};

export default Preview;
