import { useReducer } from "react";

const initialState = { // declare initial state here as {key : value} pair
    user:'',
    admin:false,
};

const reducer = (state,action)=> { // declare logic of reducer function that handle the changing of state
    switch (action.type) {
        /* case '':
            return {...state, key: new_value}; */
    
        case 'user': // user state
            return {...state,user:action.value};
    
        case 'admin': // admin state
            return {...state,admin:action.value};

        default:
            return {...state};
    }
}

const useStateReducer = () => {
    const [state,dispatch] = useReducer(reducer,initialState);

    return [state,dispatch];
};

export default useStateReducer;