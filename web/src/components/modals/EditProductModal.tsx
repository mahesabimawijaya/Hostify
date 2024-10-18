"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { fetchData, updateData } from "@/lib/axios";
import { Product } from "@/types/product";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(100000, "Price must be at least 100,000"),
    term: Yup.number()
      .required("Term is required")
      .min(1, "Term must be at least 1 month"),
    totalWeb: Yup.number()
      .required("Total Websites is required")
      .min(1, "Total websites must be at least 1"),
    totalVisit: Yup.number()
      .required("Total Visits is required")
      .min(1, "Total visits must be at least 1"),
    storage: Yup.number()
      .required("Storage is required")
      .min(1, "Storage must be at least 1 GB"),
    backup: Yup.string().required("Backup frequency is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      term: 0,
      totalWeb: 0,
      totalVisit: 0,
      storage: 0,
      backup: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      onClose();

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to edit this plan!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        try {
          await updateData(
            "api",
            `products/${productId}`,
            values,
            "application/json"
          );
          await Swal.fire("Success!", "Plan updated successfully!", "success");
          window.location.reload();
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to update the plan.";
          console.error(error);
          Swal.fire("Error!", errorMessage, "error");
        }
      }
    },
  });

  const fetchProductData = async () => {
    if (!productId) return;
    try {
      const response = await fetchData("api", `products/${productId}`);
      const product: Product = response.data;

      if (product.id) {
        formik.setFieldValue("name", product.name);
        formik.setFieldValue("description", product.description);
        formik.setFieldValue("price", product.price);
        formik.setFieldValue("term", product.term);
        formik.setFieldValue("totalWeb", product.totalWeb);
        formik.setFieldValue("totalVisit", product.totalVisit);
        formik.setFieldValue("storage", product.storage);
        formik.setFieldValue("backup", product.backup);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProductData();
    }
  }, [isOpen, productId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-2xl tracking-tight font-bold mb-4">
          Editing a plan
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              What is your plan/product name?
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="border rounded-lg w-full p-2"
              placeholder="Standard Web Hosting"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Plan description
            </label>
            <input
              type="text"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="border rounded-lg w-full p-2"
              placeholder="High-performance web hosting with daily backup..."
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Storage & Backup */}
          <div className="flex w-full justify-between gap-4">
            {/* Storage */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="storage"
                className="block text-sm font-medium text-gray-700"
              >
                Storage (GB)
              </label>
              <input
                type="number"
                name="storage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.storage}
                className="border rounded-lg w-full p-2"
              />
              {formik.touched.storage && formik.errors.storage && (
                <div className="text-red-600 text-sm">
                  {formik.errors.storage}
                </div>
              )}
            </div>

            {/* Backup Frequency */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="backup"
                className="block text-sm font-medium text-gray-700"
              >
                Backup Frequency
              </label>
              <select
                name="backup"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.backup}
                className="border rounded-lg w-full p-2"
              >
                <option value="" disabled>
                  Select backup frequency
                </option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
              {formik.touched.backup && formik.errors.backup && (
                <div className="text-red-600 text-sm">
                  {formik.errors.backup}
                </div>
              )}
            </div>
          </div>

          {/* Price & Term */}
          <div className="flex w-full justify-between gap-4">
            {/* Price */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="border rounded-lg w-full p-2"
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-600 text-sm">
                  {formik.errors.price}
                </div>
              )}
            </div>

            {/* Term */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="term"
                className="block text-sm font-medium text-gray-700"
              >
                Term (Months)
              </label>
              <input
                type="number"
                name="term"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.term}
                className="border rounded-lg w-full p-2"
              />
              {formik.touched.term && formik.errors.term && (
                <div className="text-red-600 text-sm">{formik.errors.term}</div>
              )}
            </div>
          </div>

          {/* Total Web & Total Visit */}
          <div className="flex w-full justify-between gap-4">
            {/* Total Websites */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="totalWeb"
                className="block text-sm font-medium text-gray-700"
              >
                Total Websites
              </label>
              <input
                type="number"
                name="totalWeb"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalWeb}
                className="border rounded-lg w-full p-2"
              />
              {formik.touched.totalWeb && formik.errors.totalWeb && (
                <div className="text-red-600 text-sm">
                  {formik.errors.totalWeb}
                </div>
              )}
            </div>

            {/* Total Visits */}
            <div className="mb-4 w-1/2">
              <label
                htmlFor="totalVisit"
                className="block text-sm font-medium text-gray-700"
              >
                Total Visits
              </label>
              <input
                type="number"
                name="totalVisit"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalVisit}
                className="border rounded-lg w-full p-2"
              />
              {formik.touched.totalVisit && formik.errors.totalVisit && (
                <div className="text-red-600 text-sm">
                  {formik.errors.totalVisit}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="bg-zinc-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
