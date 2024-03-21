import { Fragment } from "react";
import cn from "classnames";

const Board = ({ title, data, Component, className, children }) => {
    return (
        <Fragment>
            <div className={cn("panel", className)}>
                {title && (
                    <div className="mb-1">
                        <h3 className="panel__title">{title}</h3>
                    </div>
                )}
                {data?.length
                    ? Component && (
                          <div className="flex contained">
                              {data.map((item, key) => (
                                  <div key={key} className="flex__col col-4">
                                      <Component data={item} />
                                  </div>
                              ))}
                          </div>
                      )
                    : null}
                {children}
            </div>
        </Fragment>
    );
};

export default Board;
