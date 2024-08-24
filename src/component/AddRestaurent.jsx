import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "./Global/ContextList";

const AddRestaurent = () => {
  const { URL } = useContext(Context);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", data.title);
    formData.append("place", data.place);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("workingtime", data.workingtime);
    formData.append("ownerNumber", data.ownerNumber);
    Swal.fire({
      text: "Restaurant Added successful",
      icon: "success",
      timer: 1000,
    });

    try {
      const response = await axios.post(`${URL}/verifyRestaurant`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      notify();
    } catch (error) {
      console.error("Error registering restaurant:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto overflow-hidden shadow-2xl p-6"
      >
        <h1 className="text-4xl text-center font-semibold text-primary mb-6">
          Register Restaurant
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="title">
            Restaurant Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Restaurant Title"
          />
          <p className="text-red-600">{errors.title?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="place">
            Place
          </label>
          <input
            {...register("place", { required: "Place is required" })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Place"
          />
          <p className="text-red-600">{errors.place?.message}</p>
        </div>

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

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-primary" htmlFor="type">
              Type
            </label>
            <select
              {...register("type", { required: "Type is required" })}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Type (e.g., Veg, Non-Veg)"
            >
              <option value="All">All</option>
              <option value="Cake">Cake</option>
              <option value="Veg">Veg</option>
              <option value="non veg">non veg</option>
            </select>
            <p className="text-red-600">{errors.type?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-primary" htmlFor="workingtime">
              Working Time
            </label>
            <select
              {...register("workingtime", {
                required: "Working time is required",
              })}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            >
              <option value="Day">Day</option>
              <option value="Night">Night</option>
              <option value="Day & Night">Day & Night</option>
            </select>
            <p className="text-red-600">{errors.workingtime?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="ownerNumber">
            Owner Phone Number
          </label>
          <input
            {...register("ownerNumber", {
              required: "Owner number is required",
            })}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Owner Phone Number"
          />
          <p className="text-red-600">{errors.ownerNumber?.message}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="file">
            Restaurant Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
          />
        </div>

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

export default AddRestaurent;