import React from 'react'
import PropTypes from "prop-types";

 const Productshopitems = ({
     products:{
         _id,
         productname,
         producttype,
         detail,
         discription,
         price,
         imageUrl,
         shop:{shopname}
     }
    }) => {
    return (
        <div class="rounded-lg overflow-hidden">
        <div class="relative overflow-hidden pb-60">
          <img
            class="absolute h-full w-full object-cover object-center"
            src={imageUrl}
            alt=""
          />
        </div>
        <div class="relative bg-blue-200">
          <div class="py-10 px-8">
            <h3 class="text-2xl font-bold">{productname}</h3>
            <div class="text-gray-600 text-sm font-medium flex mb-4 mt-2">
              <p>Shop by&nbsp;</p>
              <a
                href="https://www.ls.graphics/"
                class="hover:text-black transition duration-300 ease-in-out"
              >
                {shopname}
              </a>
            </div>
            <p class="leading-7">
              {detail}
            </p>
            <div class="mt-10 flex justify-between items-center">
              <a
                href="https://collect.criggzdesign.com/index.php/resources/mockups/notepad/"
                class="flex items-center"
              >
                <p class="mr-4">Edit</p>
              </a>
              <a
                href="https://collect.criggzdesign.com/index.php/resources/mockups/notepad/"
                class="flex items-center"
              >
                <p class="mr-4">Delete</p>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14.125"
                  height="13.358"
                  viewBox="0 0 14.125 13.358"
                >
                  <g transform="translate(-3 -3.293)">
                    <path
                      id="Path_7"
                      data-name="Path 7"
                      d="M14.189,10.739H3V9.2H14.189L9.361,4.378l1.085-1.085,6.679,6.679-6.679,6.679L9.361,15.566Z"
                      fill="#1d1d1d"
                      fill-rule="evenodd"
                    ></path>
                  </g>
                </svg> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}
Productshopitems.propTypes = {
    products: PropTypes.object.isRequired
};

export default Productshopitems;