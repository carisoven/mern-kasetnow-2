import React, { useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addshopuser } from "../../redux/action/shop";


const ShopAdd = ({ addshopuser,history }) => {
  const [formaddshop, setFormAddShop] = useState({
    shopname: "",
    email: "",
    phonenumber: "",
    address: "",
  });
  const { shopname, email, phonenumber, address } = formaddshop;

  const onChange = (e) =>
    setFormAddShop({ ...formaddshop, [e.target.name]: e.target.value });

  console.log(formaddshop);

  const onSubmit = (e) => {
    e.preventDefault();
    addshopuser(formaddshop,history);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <form className="relative py-3 sm:max-w-xl  sm:mx-auto  ">
        <div className=" relative px-2 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-12 flex">
          <div className="max-w-screen-md">
            <div className="flex items-center space-x-7">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">สร้างร้านค้า</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  โปรดระบุข้อมูลร้านค้า
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">ชื่อร้านค้า</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="เกษตรนาว"
                    name="shopname"
                    value={shopname}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email ร้านค้า</label>
                  <input
                    type="email"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="kasetnow@gmail.com"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                {/* <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <label className="leading-loose">Start</label>
                <div className="relative focus-within:text-gray-600 text-gray-400">
                  <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020"/>
                  <div className="absolute left-3 top-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="leading-loose">End</label>
                <div className="relative focus-within:text-gray-600 text-gray-400">
                  <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020"/>
                  <div className="absolute left-3 top-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
              </div>
            </div> */}
                <div className="flex flex-col">
                  <label className="leading-loose">
                    เบอร์โทรศัพท์ของร้านค้า
                  </label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="02-000-0000 - 090-000-0000"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">ที่อยู่ของร้านค้า</label>
                  <textarea
                    
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder=""
                    name="address"
                    value={address}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  onClick={(e) => onSubmit(e)}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

ShopAdd.propsTypes = {
  addshopuser: PropTypes.func.isRequired,
  shops: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  shops: state.shop,
});

export default connect(mapStateToProps, { addshopuser })(ShopAdd);
