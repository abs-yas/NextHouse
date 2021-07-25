import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
import Link from "next/link";
// import { Image } from "cloudinary-react";
import { SearchBox } from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

export default function HouseForm({}: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const { register, handleSubmit, setValue, errors, watch } =
    useForm<IFormData>({
      defaultValues: {},
    });

  const address = watch("address");

  useEffect(() => {
    register({ name: "address" }, { required: "Please enter your address" });
    register({ name: "latitude" }, { required: true, min: -90, max: 90 });
    register({ name: "longitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    console.log({ data });
  };

  const onsubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onsubmit)}>
      <h1 className="text-xl">Add a New House</h1>
      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude);
            setValue("longitude", longitude);
          }}
          defaultValue=""
        />
        {errors.address && !address && (
          <p className="text-red-400">{errors.address.message}</p>
        )}
      </div>

      {address && (
        <>
          {/* Uplaod Image */}
          <div className="mt-4">
            <label
              htmlFor="image"
              className="block p-4 border-dashed border-4 cursor-pointer border-gray-600 "
            >
              Click to add house image (16:9)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              // className="mt-2 text-white "
              style={{ display: "none" }}
              ref={register({
                validate: (FileList: FileList) => {
                  if (FileList.length === 1) return true;
                  return "Please upload one file";
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files?.[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                style={{ width: "576px", height: `${(9 / 16) * 576}px` }}
              />
            )}
            {errors.image && (
              <p className="text-red-400">{errors.image.message}</p>
            )}
          </div>

          {/* Bedrooms */}
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Bedroom
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="p-2"
              ref={register({
                required: "please enter the number of bedrooms",
                max: {
                  value: 10,
                  message: "Wooahh mate, your house is too damn big",
                },
                min: {
                  value: 1,
                  message: "Must have at least 1 bedroom",
                },
              })}
            />
            {errors.bedrooms && (
              <p className="text-red-400">{errors.bedrooms.message}</p>
            )}
          </div>

          {/* Submit or Cancel */}
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>
            <Link href="/">
              <a className="ml-3">Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
}

export {};
