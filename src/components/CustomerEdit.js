import React, { Component } from "react";
import PropTypes from 'prop-types';
import { reduxForm, Field } from "redux-form";
import { Prompt } from "react-router-dom";

import setPropsAsInitial from "../helpers/setPropsAsInitial";
import CustomersActions from "./CustomersActions";
import { CUSTOMER_EDIT } from "../constants/permissions";

const isNumber = (value) => (
    isNaN(Number(value)) && "El campo debe ser un numero"
);

const validate = (values) => {
    const error = {};

    if (!values.name) {
        error.name = "El campo nombre es requerido"
    }

    if (!values.dni) {
        error.dni = "El campo dni es requerido"
    }

    return error;
};

const toNumber = (value) => value && Number(value);

/*
const onlyGrow = (value, previousValue, values) => 
        value && previousValue && (value > previousValue ? value : previousValue);
*/

class CustomerEdit extends Component {

    componentDidMount() {
       if (this.txt) {
        this.txt.focus();
       }
    };

    renderField = ({input, meta, type, label, name, withFocus}) => (
        <div>
            <label htmlFor={name}> {label} </label>
            <input 
                {...input} 
                type={!type ? "text" : type} 
                ref={withFocus && (txt => this.txt = txt)}
            />
            {
                meta.touched && meta.error && <span> {meta.error} </span>
            }
        </div>
    );

    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded} = this.props;
        return (
            <div>
                <h2> Edicion del cliente </h2>
                <form onSubmit={handleSubmit}>
                    <Field 
                        withFocus={true}
                        name="name" 
                        component={this.renderField} 
                        type="text" 
                        label="Nombre"
                    >
                    </Field>

                    <Field 
                        name="dni" 
                        component={this.renderField} 
                        type="text"
                        validate={isNumber}
                        label="DNI"
                    >
                    </Field>

                    <Field 
                        name="age" 
                        component={this.renderField} 
                        type="number"
                        validate={isNumber}
                        label="Edad"
                        parse={toNumber}
                    >
                    </Field>
                    <CustomersActions>
                        <button type="submit" disabled={pristine || submitting}> 
                            Aceptar 
                        </button>

                        <button type="button" disabled={submitting} onClick={onBack}> 
                            Regresar 
                        </button>
                    </CustomersActions>
                    <Prompt
                        when={!pristine && !submitSucceeded}
                        message="Se perderan los datos si continua"
                    ></Prompt>
                </form>
            </div>
        );
    };
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired
}

const CustomerEditForm = reduxForm(
    {
        form: 'CustomerEdit',
        validate
    })(CustomerEdit);

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm)); 