export const appendItem = (state, action) => {
    const { directive, displays, filepath, screenshot } = action.payload.data;

    return {
        ...state,
        checklist: [
            ...state?.checklist,
            {
                id: action.payload?.id,
                value: {
                    display: displays ? displays : undefined,
                    directive: directive ? directive : undefined,
                    file_paths: filepath ? filepath : undefined,
                    screenshots: screenshot ? screenshot : undefined,
                },
            },
        ],
    };
};

export const removeItem = (state, action) => {
    const filteredList = state.checklist.filter((item) => item.id !== action.payload.id);
    return {
        ...state,
        checklist: filteredList,
    };
};
