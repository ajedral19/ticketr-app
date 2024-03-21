import { Fragment } from "react";
import TicketCard from "../../components/TicketCard";
import { Text } from "../../components/Input";
import { useNavigate, useOutletContext } from "react-router";
import { Filter } from "../../components";

const Tickets = ({ data }) => {
    const navigate = useNavigate();

    const handleAddNew = () => navigate("register");
    const [tickets] = useOutletContext();

    return (
        <Fragment>
            <div className="">
                <Filter />
                <div className="flex">
                    {tickets
                        ? tickets?.map((item, key) => (
                              <div key={key} className="flex__col col-4 sm-4">
                                  <TicketCard ticket={item} />
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </Fragment>
    );
};

export default Tickets;
