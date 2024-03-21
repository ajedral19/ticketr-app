import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import svg from "../assets/svg";
import Strip from "./Strip";
import Preview from "./Preview";
import ErrorHandler from "./ErrorHandler";

const Checklist = ({ data, setData }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [editMode, setEditMode] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const stripOnClick = (e, id) => {
        if (e.target.name == "delete") {
            removeItem(id);
            if (searchParams.get("item") == id) {
                setSearchParams((params) => ({ id: params.get("id") }));
            }
        } else if (e.target.name == "edit") {
            modifyItem();
        } else {
            setSearchParams((params) => ({ item: id }));
            setEditMode(false);
        }
    };

    useEffect(() => {
        const item_id = searchParams.get("item");
        if (data && data.checklist) {
            if (typeof data.checklist == "object" && data.checklist.length) {
                setActiveItem(data.checklist.find((item) => item.id == item_id));
            }
            if (!data.checklist.length) {
                setActiveItem(null);
                setSearchParams((params) => ({}));
            }
        }
    }, [searchParams, data]);

    // -- //
    const removeItem = (id) => {
        const filteredData = data.checklist.filter((item) => item.id !== id);
        setData((cur) => ({ ...cur, checklist: filteredData }));
    };

    const modifyItem = () => {
        setEditMode(true);
    };

    // -- //

    return (
        <Fragment>
            <div className="mt-2">
                <div className="flex">
                    <div className="flex__col col-4">
                        <div className="panel panel--transparent">
                            {data?.checklist.length
                                ? data?.checklist.map((item, key) => (
                                      <Strip
                                          className={cn({ "mt-1": key > 0 })}
                                          active={searchParams.get("item") == item.id}
                                          key={key}
                                          data={item}
                                          onClick={(e) => stripOnClick(e, item.id)}
                                          editMode={editMode}
                                          setEditMode={setEditMode}
                                          options={[
                                              {
                                                  method: "delete",
                                                  action: removeItem,
                                              },
                                              {
                                                  method: "edit",
                                                  action: modifyItem,
                                              },
                                          ]}
                                      />
                                  ))
                                : null}
                        </div>
                    </div>
                    <div className="flex__col col-8 sm-4">
                        <div className="panel">
                            {activeItem ? (
                                <Preview editMode={editMode} setEditMode={setEditMode} data={activeItem} />
                            ) : (
                                <ErrorHandler>
                                    <h2>no selected item</h2>
                                </ErrorHandler>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Checklist;
