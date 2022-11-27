import { createAction } from "redux-actions";

import { apiPut } from "../api";
import { urlCustomers } from "../api/urls";
import { UPDATE_CUSTOMER } from "../constants";

export const updateCustomer = createAction(UPDATE_CUSTOMER, 
    (id, customer) => apiPut(urlCustomers, id, customer)());