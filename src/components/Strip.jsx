import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromList } from "../Redux/Slices/ticket";
import { reveal } from "../Redux/Slices/modal";
import svg from "../assets/svg";
import Thumbnail from "./Thumbnail";
import { Button } from "./";
import { excerpt } from "../Utils";
import cn from "classnames";
import style from "./Styles/Strip.module.sass";

const Strip = ({ data, className, onClick, options, active }) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const action = (e, method, args) => {
        if (options) {
            options.forEach((option) => option.method == method && option.action(e, args));
        }
    };

    const handleRemove = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        dispatch(removeFromList({ id: data.id }));
    };

    const handleCLick = (e) => {
        dispatch(reveal({ show: true, content: { ...data } }));
    };

    return (
        <Fragment>
            <div className={cn(style.strip, { [style.selected]: active })} onClick={onClick}>
                <div className={cn("pane", style.pane)}>
                    <p>{excerpt(data.value.directive, 5)}</p>
                    <div className={cn(style.tags)}>
                        <span className="tag block mt-1">{data.value.display}</span>
                        <span className="tag block mt-1">{data.value.display}</span>
                    </div>
                    {}
                    {active ? <Button text={!edit ? "edit" : "cancel"} variant={!edit ? "default" : "danger"} onClick={() => setEdit(!edit)} /> : null}
                </div>
            </div>
            {/* <div className={cn("strip", className, { focused: active })} onClick={onClick}>
                <div className="strip__content">
                    <p>{data.value.display}</p>
                    <p>{excerpt(data.value.directive, 6)}</p>
                    <div className="flex fit mt-1">
                        <div className="flex__col">
                            <button type="button" name="delete" className="fluid inline btn btn--minified">
                                remove
                            </button>
                        </div>
                        {active && (
                            <div className="flex__col">
                                {editMode ? (
                                    <button type="button" name="cancel" className="fluid inline btn btn--minified" onClick={() => setEditMode(false)}>
                                        cancel
                                    </button>
                                ) : (
                                    <button type="button" name="edit" className="fluid inline btn btn--minified">
                                        edit
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
        </Fragment>
    );
};

export default Strip;
