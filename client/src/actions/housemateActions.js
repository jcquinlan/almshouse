export const ADD_HOUSEMATE_DATA = 'ADD_HOUSEMATE_DATA';
export const addHousemateData = (housemate) => {
    return {
        type: ADD_HOUSEMATE_DATA,
        payload: housemate
    }
}

export const REMOVE_HOUSEMATE_DATA = 'REMOVE_HOUSEMATE_DATA';
export const removeHousemateData = () => {
    return {
        type: REMOVE_HOUSEMATE_DATA,
    }
}

export const ADD_HOUSEMATE_ERROR = 'ADD_HOUSEMATE_ERROR';
export const addHousemateError = (error) => {
    return {
        type: ADD_HOUSEMATE_ERROR,
        payload: error
    }
}

export const REMOVE_HOUSEMATE_ERROR = 'REMOVE_HOUSEMATE_ERROR';
export const removeHousemateError = () => {
    return {
        type: REMOVE_HOUSEMATE_ERROR,
    }
}

export const START_HOUSEMATE_LOADING = 'START_HOUSEMATE_LOADING';
export const startHousemateLoading = () => {
    return {
        type: START_HOUSEMATE_LOADING,
    }
}

export const STOP_HOUSEMATE_LOADING = 'STOP_HOUSEMATE_LOADING';
export const stopHousemateLoading = () => {
    return {
        type: STOP_HOUSEMATE_LOADING,
    }
}