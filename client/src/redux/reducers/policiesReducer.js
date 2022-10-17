const initialData = {
    policies: [],
};
export const policiesReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'GET_ALL_POLICIES': {
            return {
                ...state,
                policies: action.payload
            }
        }
        default: return state
    }

}