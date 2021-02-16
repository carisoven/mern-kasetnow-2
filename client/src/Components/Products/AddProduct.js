import React, { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
      productname: " ",
      type: " "
    });
    const {productname,type} = formData;

    const onChange = (e) => {
      // if (e.target.name === image) {
      //   setFormData({ ...formData,[e.target.image]:e.target.files[0]
      // }
      setFormData({ ...formData, [e.target.name]: e.target.value })
      // setFormData({ ...formData,if ([e.target.name]) {
      //   // [e.target.name]: e.target.value
      // } });
    };
console.log(formData);
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("Choose file");
    const onFileChange = (e) => {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
      };
      console.log(image);

      const onSubmit = (e,image) => {
        e.preventDefault();
        
        const payload = new FormData();
        payload.append("image", image);
        payload.append("productname", formData.productname);
        payload.append("type", formData.type);
        
        console.log(payload);
        // createBook(payload, history);
       };

  return (
    <div class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="productname"
          >
            ชื่อสินค้า
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border-grey-lighter rounded py-3 px-4 mb-3"
            id="productname"
            name="productname"
            type="text"
            placeholder="ปลาทูแม่กลอง"
            onChange={(e) => onChange(e)} 
            value={productname}
          />
        </div>
        <div class="md:w-1/2 px-3">
          {/* <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe"/> */}
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            ประเภทของสินค้า
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              name="type"
              onChange={(e) => onChange(e)} 
              value={type}
            >
              <option>ผัก</option>
              <option>ผลไม้</option>
              <option>เนื้อสัตว์</option>
              <option>ปลาและอาหารทะเล</option>
              <option>ข้าว แป้ง ธัญญพืช</option>
            </select>
          </div>
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-price"
          >
            ราคาของสินค้า
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="grid-price"
            name="price"
            type="number"
            placeholder="50.00"
            onChange={(e) => onChange(e)} 
          />
        </div>
      </div>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-invent"
          >
            จำนวนของสินค้า
          </label>
          <input
            class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            id="grid-invent"
            name="invent"
            type="number"
            placeholder="0"
            onChange={(e) => onChange(e)} 
          />
        </div>
        <div class="md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-zip"
          >
            Zip
          </label>
          <label class="w-full h-12 flex flex-col items-center px-4 py-6 bg-white text-blue justify-center rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
            <span class="text-base">Select a file</span>
            <input
              type="file"
              onChange={(e) => onFileChange(e)}
              class="hidden"
            />
          </label>
        </div>
      </div>
      <div class="-mx-3 md:flex mb-6">
        <label class="w-full h-12 flex flex-col items-center px-4 py-6 bg-white text-blue justify-center rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <button  onClick={ (e) => onSubmit(e) }>Submit</button>
        </label>
      </div>
    </div>
  );
};
export default AddProduct;
