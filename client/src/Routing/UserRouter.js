import React,{Fragment} from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UserRouter = ({ component: Component,auth:{isAuthenticated,admin,userrole,loading} ,...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Fragment>
            <h1>Loading</h1>
          </Fragment>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

UserRouter.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(UserRouter);
