const defaultHousemate = {
    data: null,
    error: null,
    loading: false
}

export const HousemateReducer = (housemate = defaultHousemate, action) => {
    switch (action.type){
        case 'ADD_HOUSEMATE_DATA':
            return Object.assign({}, housemate, { data: HousemateDataReducer(housemate.data, action) });

        case 'ADD_HOUSEMATE_ERROR':
            return Object.assign({}, housemate, { error: HousemateErrorReducer(housemate.error, action) });

        case 'START_HOUSEMATE_LOADING':
            return Object.assign({}, housemate, { loading: HousemateLoadingReducer(housemate.loading, action) });

        case 'STOP_HOUSEMATE_LOADING':
            return Object.assign({}, housemate, { loading: HousemateLoadingReducer(housemate.loading, action) });

        default:
            return housemate;
    }
}

const HousemateDataReducer = (data = null, action) => {
    switch (action.type){
        case 'ADD_HOUSEMATE_DATA':
            return Object.assign({}, data, action.payload);
        
        case 'REMOVE_HOUSEMATE_DATA':
            return null;
        
        default:
            return data;
    }
}

const HousemateErrorReducer = (error = null, action) => {
    switch (action.type){
        case 'ADD_HOUSEMATE_ERROR':
            return action.payload;
        
        case 'REMOVE_HOUSEMATE_ERROR':
            return null;
        
        default:
            return error;
    }
}

const HousemateLoadingReducer = (loading = false, action) => {
    switch (action.type) {
        case 'START_HOUSEMATE_LOADING':
            return true;
        
        case 'STOP_HOUSEMATE_LOADING':
            return false;
        
        default:
            return loading;
    }
}