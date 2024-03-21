import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Text } from "./Input";
import cn from "classnames";
import style from "./Styles/Search.module.sass";

const Search = ({ outerOnCLick, focused }) => {
    const { register } = useForm();

    return (
        <Fragment>
            <div className={cn(style.search)}>
                <div className={cn(style["search-panel"])}>
                    <p className="title-5">
                        <Text focused={focused} name="search" placeholder="search" register={register} />
                    </p>
                </div>
                <div className={style.bruh} onClick={outerOnCLick}></div>
            </div>
        </Fragment>
    );
};

export default Search;
