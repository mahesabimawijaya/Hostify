"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { createData } from "@/lib/axios";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (product: any) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    term: 0,
    totalWeb: 0,
    totalVisit: 0,
    storage: 0,
    backup: "",
  };

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

  const handleSubmit = async (values: typeof initialValues) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to create a new product!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await createData(
          "api",
          "products",
          values,
          "application/json"
        );
        onProductCreated(response.data.data);
        await Swal.fire("Success!", "Plan created successfully!", "success");
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to create a plan.";
        console.error(error);
        Swal.fire("Error!", errorMessage, "error");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px]">
        <h2 className="text-2xl tracking-tight font-bold mb-4">
          Create a new plan
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              {/* plan name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  What is your plan/product name?
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border rounded-lg w-full p-2"
                  placeholder="Standard Web Hosting"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* desc */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Plan description
                </label>
                <Field
                  type="text"
                  name="description"
                  className="border rounded-lg w-full p-2"
                  placeholder="High-performance web hosting with daily backup..."
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* storage & backup */}
              <div className="flex w-full justify-between gap-4">
                {/* storage */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="storage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Storage (GB)
                  </label>
                  <Field
                    type="number"
                    name="storage"
                    className="border rounded-lg w-full p-2"
                  />
                  <ErrorMessage
                    name="storage"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* backup dropdown */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="backup"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Backup Frequency
                  </label>
                  <Field
                    as="select"
                    name="backup"
                    className="border rounded-lg w-full p-2 text-"
                  >
                    <option value="" disabled>
                      Select backup frequency
                    </option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </Field>
                  <ErrorMessage
                    name="backup"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>

              {/* price & term */}
              <div className="flex w-full justify-between gap-4">
                {/* price */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="border rounded-lg w-full p-2"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* term */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="term"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Term (Months)
                  </label>
                  <Field
                    type="number"
                    name="term"
                    className="border rounded-lg w-full p-2"
                  />
                  <ErrorMessage
                    name="term"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>

              {/* total web & total visit */}
              <div className="flex w-full justify-between gap-4">
                {/* total web */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="totalWeb"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Websites
                  </label>
                  <Field
                    type="number"
                    name="totalWeb"
                    className="border rounded-lg w-full p-2"
                  />
                  <ErrorMessage
                    name="totalWeb"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                {/* total visit */}
                <div className="mb-4 w-1/2">
                  <label
                    htmlFor="totalVisit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Visits
                  </label>
                  <Field
                    type="number"
                    name="totalVisit"
                    className="border rounded-lg w-full p-2"
                  />
                  <ErrorMessage
                    name="totalVisit"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>

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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProductModal;
