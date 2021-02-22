import React, { Fragment, useEffect } from "react";
// * Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { productsload } from "../../redux/action/products";
import Productshopitems from "./Productshopitems";

const Products = ({
  productsload,
  products: { productshop, loading },
  match,
}) => {
  useEffect(() => {
    productsload(match.params.id);
  }, [productsload]);
  return (
    <Fragment>
      {loading ? (
        <p>Loading Data</p>
      ) : (
        <div class="container mx-auto mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {productshop.length > 0 ? (
            productshop.map((products) => (
              <Productshopitems key={products._id} products={products} />
            ))
          ) : (
            <Fragment>
              <h4>No profiles found...</h4>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

Products.propTypes = {
  productsload: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { productsload })(Products);
