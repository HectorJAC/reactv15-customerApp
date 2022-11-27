import { handleActions } from "redux-actions";
import { 
    DELETE_CUSTOMER, 
    FETCH_CUSTOMERS, 
    INSERT_CUSTOMER, 
    UPDATE_CUSTOMER 
} from "../constants";

export const customers = handleActions({
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload], 
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) => {
        const customerPayload = action.payload;
        const {id} = customerPayload    ; // i = 2 name = 'nuevo nombre'
        /*
        [
            {id: 1, name: '', ...},
            {id: 2, name: '', ...},
            {id: 3, name: '', ...},
        ]
        */
       const customers = state;
       const initialValues = [];

        // Primera iteracion
        // acc = []
        // {id: 1, nameL '', ...}
        // [{id: 1, name: '', ...}]

        // Segunda iteracion
        // acc = [{id: 1, name: '', ...}]
        // {id: 2, name: 'viejo nombre', ...} =>  {id: 2, name: 'nuevo nombre', ...}
        // {id: 1, name: '', ...}, {id: 2, name: 'nuevo nombre', ...}

        // Tercera iteracion
        // acc = [{id: 1, name: '', ...}, {id: 2, name: 'nuevo nombre', ...}]

       const newCustomers = customers.reduce((acc, customer) => {
            if (customer.id === id) {
                return [...acc, customerPayload];
            } else {
                return [...acc, customer];
            }
       }, initialValues);

       return newCustomers;
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(c => c.id !== action.payload)
}, []);

