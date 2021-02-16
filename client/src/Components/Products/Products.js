import React from 'react'

 const Products = () => {
    return (
        <div class="container mx-auto mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div class="rounded-lg overflow-hidden">
          <div class="relative overflow-hidden pb-60">
            <img
              class="absolute h-full w-full object-cover object-center"
              src="https://mern-kasetnow.s3-ap-southeast-1.amazonaws.com/Strawberry.jpg"
              alt=""
            />
          </div>
          <div class="relative bg-blue-200">
            <div class="py-10 px-8">
              <h3 class="text-2xl font-bold">Strawberry</h3>
              <div class="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                <p>Shop by&nbsp;</p>
                <a
                  href="https://www.ls.graphics/"
                  class="hover:text-black transition duration-300 ease-in-out"
                  >Oven</a
                >
              </div>
              <p class="leading-7">
                    กดหกดหกดหกดห
                    กดหกดหกดหกดห
                    กดหกดหกดหกดหกหดหกดไำดำไำหกดหด
                     ก
              </p>
              <div class="mt-10 flex justify-between items-center">
                <div>
                  <img
                    src="https://collect.criggzdesign.com/wp-content/uploads/2020/07/Ps.svg"
                    alt=""
                    class="w-6"
                  />
                </div>
                <a
                  href="https://collect.criggzdesign.com/index.php/resources/mockups/notepad/"
                  class="flex items-center"
                >
                  <p class="mr-4">ฺBuy now</p>
                  <svg
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
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg overflow-hidden">
          <div class="relative overflow-hidden pb-60">
            <img
              class="absolute h-full w-full object-cover object-center"
              src="https://mern-kasetnow.s3-ap-southeast-1.amazonaws.com/Apple.jpeg"
              alt=""
            />
          </div>
          <div class="relative bg-blue-200">
            <div class="py-10 px-8">
              <h3 class="text-2xl font-bold">Notepad</h3>
              <div class="text-gray-600 text-sm font-medium flex mb-4 mt-2">
                <p>Provided by&nbsp;</p>
                <a
                  href="https://www.ls.graphics/"
                  class="hover:text-black transition duration-300 ease-in-out"
                  >LS Graphics</a
                >
              </div>
              <p class="leading-7">
                High quality notepad mockup in a huge resolution and with
                changeable everything.
              </p>
              <div class="mt-10 flex justify-between items-center">
                <div>
                  <img
                    src="https://collect.criggzdesign.com/wp-content/uploads/2020/07/Ps.svg"
                    alt=""
                    class="w-6"
                  />
                </div>
                <a
                  href="https://collect.criggzdesign.com/index.php/resources/mockups/notepad/"
                  class="flex items-center"
                >
                  <p class="mr-4">Read more</p>
                  <svg
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
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}
export default Products