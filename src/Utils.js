import axios from "axios";
import { useSelector } from "react-redux";

export const generateListId = (len = 4, ticketNo = undefined) => {
    if (!ticketNo) return;

    let id = "";

    const map = [
        [97, 122],
        [65, 90],
        [48, 57],
    ];
    for (let n = 0; n < len; n++) {
        const reference = Math.floor(Math.random() * map.length);
        const min = Math.ceil(map[reference][0]);
        const max = Math.floor(map[reference][1]);
        const result = Math.floor(Math.random() * (max - min) + min);
        const char = String.fromCharCode(result);
        id += char;
    }

    return (ticketNo += id);
};

export const excerpt = (text, max = 10) => {
    if (!text) return;
    if (text.split(" ").length < max) return text;

    let excerpt = text.split(" ").splice(0, max).join(" ");
    excerpt += "...";
    return excerpt;
};

export const handleOnCheck = (event, ref, setState, key) => {
    const target = event.target;
    const checked = target.checked;
    const value = target.value;

    if (checked) {
        if (ref) {
            if (!ref.current[key].includes(value)) return (ref.current[key] = [...ref.current[key], value]);
            return;
        }
        if (setState) {
            setState((cur) => ({ ...cur, [key]: [...cur[key], value] }));
            return;
        }
    }

    if (ref) ref.current[key] = ref.current[key].filter((item) => item !== value);
    if (setState) setState((cur) => ({ ...cur, [key]: cur[key].filter((item) => item !== value) }));
};

export const getTicketData = (id, setter, signal) => {
    try {
        const fetchData = async () => {
            const result = await axios.request(
                {
                    method: "get",
                    url: "db/mockData.json",
                    baseURL: "/",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                signal
            );

            if (!id) return setter(result.data.ticketstore[0]);

            setter(result.data.ticketstore[0].data.rows.find((item) => item.id == id));
        };

        fetchData();
    } catch (err) {
        console.log(err);
    }
};

export const getUsersName = (id) => {
    return "jane doe";
};

export const escapeListener = (action) => {
    document.onkeydown = (e) => {
        const key = e.key.toLowerCase();
        if (key == "escape") {
            e.preventDefault();
            return action();
        }
    };
};

export const getValueById = (id, objName) => {
    if (!id) return;
    let val;
    const getPreset = async (objArr) => {
        return await axios.request({
            method: "get",
            url: "db/mockData.json",
            baseURL: "/",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const preset = getPreset(objName);
    preset
        .then((res) => console.log(res.data.ticketstore))
        .catch((err) => console.log(err));

    return val;
};
