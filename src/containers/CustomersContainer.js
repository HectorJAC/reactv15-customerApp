import React, { Component } from "react";
import AppFrame from "../components/AppFrame";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CustomersList from "../components/CustomersList";
import CustomersActions from "../components/CustomersActions";
import { fetchCustomers } from "../actions/fetchCustomers";
import { getCustomers } from "../selectors/customers";

class CustomersContainer extends Component {

    componentDidMount() {
        if (this.props.customers.length === 0) {
            this.props.fetchCustomers();
        }   
    }

    handleAddNew = () => {
        this.props.history.push('/customers/new');
    }

    handleOnBack = () => {
        this.props.history.goBack();
    };

    renderBody = (customers) => (
        <div>
            <CustomersList
            customers={customers}
            urlPath={'customers/'}
            />
            <CustomersActions>
                <button onClick={this.handleAddNew}> Nuevo Cliente </button>
                <button type="button" onClick={this.handleOnBack}> Regresar </button>
            </CustomersActions>
        </div>
    );

    render() {
        return (
            <div>
                <AppFrame 
                    header={'Listado de clientes'}
                    body={this.renderBody(this.props.customers)}
                />
            </div>
        );
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};

CustomersContainer.defaultProps = {
    customers: [ ]
};

const mapStateToProps = (state) => ({
    customers: getCustomers(state)
});

export default withRouter(connect(mapStateToProps, {fetchCustomers})(CustomersContainer));