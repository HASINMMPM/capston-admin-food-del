import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "./Global/ContextList";
import Swal from "sweetalert2";

const AddDishes = () => {
  const { URL, id } = useContext(Context);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [singleAdmin, setSingleAdmin] = useState(null);
  const [resId, setResId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image selection
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/category/getall`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch admin details
    const fetchAdmin = async () => {
      const admURL = `${URL}/admin/singeladmin/${id}`;
      // console.log(admURL);
      try {
        const response = await axios.get(admURL);
        // console.log(response.data)
        setSingleAdmin(response.data);
        // console.log(response.data.restaurant._id)
        setResId(response.data.restaurant._id);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        // console.log(error.response.data);
      }
    };

    fetchCategories();
    fetchAdmin();
  }, [URL, id]);
  // console.log("single admin", singleAdmin);
  // Handle form submission
  const onSubmit = async (data) => {
    console.log("data",data)
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categories", data.categories);
    formData.append("ownerId", id);
    formData.append("restaurant", resId);

    try {
      await axios.post(`${URL}/food/addfood`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        text: "Food added successfully",
        icon: "success",
        timer: 1000,
      });
      // reset();
      // setImage(null);
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
        timer: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto overflow-hidden shadow-2xl p-6"
      >
        <h1 className="text-4xl text-center font-semibold text-primary mb-6">
          Add Dishes
        </h1>

        {/* Food Title */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="title">
            Food Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Food Title"
          />
          <p className="text-red-600">{errors.title?.message}</p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="description">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Description"
          />
          <p className="text-red-600">{errors.description?.message}</p>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="price">
            Price
          </label>
          <input
            {...register("price", { required: "Price is required" })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Price"
            type="number"
          />
          <p className="text-red-600">{errors.price?.message}</p>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-primary" htmlFor="categories">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat._id}
                  {...register("categories", {
                    required: "Category is required",
                  })}
                  className="rounded p-2"
                />
                <label htmlFor={cat._id} className="text-slate-700">
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
          <p className="text-red-600">{errors.categories?.message}</p>
        </div>

        {/* Owner ID */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="ownerId">
            Owner ID
          </label>
          <input
            value={id}
            className="rounded-md p-2 bg-slate-50 text-slate-500 outline-none shadow-md"
            readOnly
          />
        </div>

        {/* Restaurant Name */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="restaurant">
            Restaurant
          </label>
          <input
            
            className="rounded-md p-2 bg-slate-50 text-slate-500 outline-none shadow-md"
            defaultValue={resId}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="res name">
            Restaurant Name
          </label>
          <input
            {...register("restName")}
            className="rounded-md p-2 bg-slate-50 text-slate-500 outline-none shadow-md"
            defaultValue={singleAdmin?.restaurant.Title}
            readOnly
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="image">
            Food Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AddDishes;
