/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
// * Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadShop } from "../../redux/action/shop";

import {Link, Route, Switch} from 'react-router-dom'
import AddProduct from "../Products/AddProduct";
import Products from '../Products/Products'

const Shop = ({ loadShop, shop: { myshop } }) => {
  useEffect(() => {
    loadShop();
  }, [loadShop]);

  if (myshop === null) {
    return (
      <Fragment>
        <h2>หากยังไม่ได้สร้างร้านค้า</h2>
        <br/>
        <Link to="/addshop">สร้างร้านค้า</Link>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {!myshop.isApproved ? (
        <Fragment>
          <p>{myshop.status}</p>
        </Fragment>
      ) : (
        <div>
          <div className="min-h-10 flex bg-light-green-400-accent-contrast py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full flex items-center p-2 rounded-xl shadow ">
              <div className="flex items-center space-x-4">
                <img
                  src="https://avatars2.githubusercontent.com/u/1490347?s=460&u=39d7a6b9bc030244e2c509119e5f64eabb2b1727&v=4"
                  alt="My Shop Logo"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="flex-grow p-3">
                <div className="font-semibold text-3xl text-gray-700">
                  {myshop.shopname}
                </div>
                <div className="text-base text-gray-500">{myshop.email}</div>
                <div className="text-base text-gray-500">
                  เบอร์โทรศัพท์: {myshop.phonenumber}
                </div>
              </div>
            </div>
          </div>
          <nav className="bg-white px-8 pt-2 shadow-md">
            <div className="-mb-px flex justify-center">
            <Link
                to="/myshop/addproduct"
                className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
              >
                Add Products
              </Link>
              <Link
              to="/myshop"
                className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
              >
                Products
              </Link>
              <a
                className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
              >
                Order
              </a>
              <a
                className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3"
              >
                payment
              </a>
            </div>
          </nav>
          <Switch>
            <Route exact path="/myshop" component={Products}/>
            <Route path="/myshop/addproduct" component={AddProduct}/>
            {/* 
            <Route path="/myshop/myorder" component={Order}/> 
            <Route path="/myshop/myorder" component={Order}/>

            */}

          </Switch>


        </div>
      )}
    </Fragment>
  );
};

Shop.propTypes = {
  loadShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, { loadShop })(Shop);
