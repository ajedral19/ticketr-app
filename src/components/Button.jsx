import { Fragment } from "react";
import cn from "classnames";
import style from "./Styles/Button.module.sass";

const variants = ["primary", "secondary", "default", "danger", "disabled"];
const Button = ({ children, onClick, variant, type, icon, text, overlay }) => {
    const variantClass = !(variants.indexOf(variant?.toLowerCase()) < 0) ? [style[variant]] : null;

    return (
        <Fragment>
            <button type={type} onClick={onClick} className={cn(style.btn, { [style.overlay]: overlay }, variantClass)}>
                {icon && <span className={cn(style.icon)}>{icon}</span>}
                {text}
                {children}
            </button>
        </Fragment>
    );
};

export default Button;
