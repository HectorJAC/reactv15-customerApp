import React, { Component } from "react";    

const setPropsAsInitial = (WrappedComponent) => (
    class extends Component {
        render() {
            return <WrappedComponent {...this.props} 
                initialValues={this.props} 
                enableReinitialize
            />
        }
    }
);

export default setPropsAsInitial;