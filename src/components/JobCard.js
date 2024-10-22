import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const JobCardSchema = Yup.object().shape({
  clientId: Yup.string().required("Client ID is required"),
  laptopId: Yup.string().required("Laptop ID is required"),
  technicianId: Yup.string().required("Technician ID is required"),
  problemDescription: Yup.string().required("Problem description is required"),
  status: Yup.string().required("Status is required"),
  creationDate: Yup.date().required("Creation date is required"),
  completionDate: Yup.date().nullable(),
  timeTaken: Yup.number().positive("Time taken must be positive").nullable(),
  finalCost: Yup.number().positive("Final cost must be positive").nullable(),
});

const JobCard = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/url/jobcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Job card created:", data);
    } catch (error) {
      console.error("Error creating job card:", error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Create Job Card</h1>

      <Formik
        initialValues={{
          clientId: "",
          laptopId: "",
          technicianId: "",
          problemDescription: "",
          status: "pending",
          creationDate: "",
          completionDate: "",
          timeTaken: "",
          finalCost: "",
        }}
        validationSchema={JobCardSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="clientId" className="text-sm font-medium text-gray-600">
                Client ID
              </label>
              <Field
                type="text"
                name="clientId"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="clientId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="laptopId" className="text-sm font-medium text-gray-600">
                Laptop ID
              </label>
              <Field
                type="text"
                name="laptopId"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="laptopId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="technicianId" className="text-sm font-medium text-gray-600">
                Technician ID
              </label>
              <Field
                type="text"
                name="technicianId"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="technicianId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="problemDescription" className="text-sm font-medium text-gray-600">
                Problem Description
              </label>
              <Field
                as="textarea"
                name="problemDescription"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="problemDescription"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-600">
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="creationDate" className="text-sm font-medium text-gray-600">
                Creation Date
              </label>
              <Field
                type="date"
                name="creationDate"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="creationDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="completionDate" className="text-sm font-medium text-gray-600">
                Completion Date
              </label>
              <Field
                type="date"
                name="completionDate"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="completionDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="timeTaken" className="text-sm font-medium text-gray-600">
                Time Taken (hours)
              </label>
              <Field
                type="number"
                name="timeTaken"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="timeTaken" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="finalCost" className="text-sm font-medium text-gray-600">
                Final Cost
              </label>
              <Field
                type="number"
                name="finalCost"
                className="p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="finalCost" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobCard;
