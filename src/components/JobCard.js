import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Stepper from "react-stepper-horizontal";
import * as Yup from "yup";

const JobCardSchema = Yup.object().shape({
  clientName: Yup.string().required("Client name is required"),
  clientEmail: Yup.string().email("Invalid email").required("Client email is required"),
  clientPhone: Yup.string().required("Client phone is required"),
  clientAddress: Yup.string().required("Client address is required"),
  deviceModel: Yup.string().required("Device model is required"),
  deviceSerialNumber: Yup.string().required("Device serial number is required"),
  brand: Yup.string().required("Brand is required"),
  hddOrSsd: Yup.string().required("HDD/SSD type is required"),
  hddOrSsdSerialNumber: Yup.string().required("HDD/SSD serial number is required"),
  memory: Yup.string().required("Memory is required"),
  memorySerialNumber: Yup.string().required("Memory serial number is required"),
  battery: Yup.string().required("Battery type is required"),
  batterySerialNumber: Yup.string().required("Battery serial number is required"),
  adapter: Yup.string().required("Adapter type is required"),
  adapterSerialNumber: Yup.string().required("Adapter serial number is required"),
  warrantyStatus: Yup.string().required("Warranty status is required"),
  problemDescription: Yup.string().required("Problem description is required"),
  technicianId: Yup.string().required("Technician ID is required"),
  status: Yup.string().required("Status is required"),
  creationDate: Yup.date().required("Creation date is required"),
  completionDate: Yup.date().nullable(),
});

const JobCard = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const steps = [
    { title: "Client Information" },
    { title: "Device Information" },
    { title: "Job Details" },
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://192.168.100.10:3000/jobcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
          client: {
            name: values.clientName,
            email: values.clientEmail,
            phone_number: values.clientPhone,
            address: values.clientAddress,
          },
          device: {
            device_model: values.deviceModel,
            device_serial_number: values.deviceSerialNumber,
            brand: values.brand,
            hdd_or_ssd: values.hddOrSsd,
            hdd_or_ssd_serial_number: values.hddOrSsdSerialNumber,
            memory: values.memory,
            memory_serial_number: values.memorySerialNumber,
            battery: values.battery,
            battery_serial_number: values.batterySerialNumber,
            adapter: values.adapter,
            adapter_serial_number: values.adapterSerialNumber,
            warranty_status: values.warrantyStatus,
          },
          jobDetails: {
            problem_description: values.problemDescription,
            technician_id: values.technicianId,
            status: values.status,
            creation_date: values.creationDate,
            completion_date: values.completionDate,
          }
        }),
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
    <div className="mt-8 max-w-2xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Create Job Card</h1>

      <Stepper steps={steps} activeStep={step} />

      <Formik
        initialValues={{
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          clientAddress: "",
          deviceModel: "",
          deviceSerialNumber: "",
          brand: "",
          hddOrSsd: "",
          hddOrSsdSerialNumber: "",
          memory: "",
          memorySerialNumber: "",
          battery: "",
          batterySerialNumber: "",
          adapter: "",
          adapterSerialNumber: "",
          warrantyStatus: "in_warranty",
          problemDescription: "",
          technicianId: "",
          status: "pending",
          creationDate: "",
          completionDate: "",
        }}
        validationSchema={JobCardSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Step 1: Client Information */}
            {step === 0 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="clientName" className="text-sm font-medium text-gray-600">Client Name</label>
                  <Field type="text" name="clientName" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="clientName" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="clientEmail" className="text-sm font-medium text-gray-600">Client Email</label>
                  <Field type="email" name="clientEmail" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="clientEmail" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="clientPhone" className="text-sm font-medium text-gray-600">Client Phone</label>
                  <Field type="text" name="clientPhone" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="clientPhone" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="clientAddress" className="text-sm font-medium text-gray-600">Client Address</label>
                  <Field type="text" name="clientAddress" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="clientAddress" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}

            {/* Step 2: Device Information */}
            {step === 1 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="deviceModel" className="text-sm font-medium text-gray-600">Device Model</label>
                  <Field type="text" name="deviceModel" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="deviceModel" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="deviceSerialNumber" className="text-sm font-medium text-gray-600">Device Serial Number</label>
                  <Field type="text" name="deviceSerialNumber" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="deviceSerialNumber" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="brand" className="text-sm font-medium text-gray-600">Brand</label>
                  <Field type="text" name="brand" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
                </div>
                {/* Other device fields */}
              </>
            )}

            {/* Step 3: Job Details */}
            {step === 2 && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="problemDescription" className="text-sm font-medium text-gray-600">Problem Description</label>
                  <Field as="textarea" name="problemDescription" className="p-2 mt-1 border border-gray-300 rounded-md" />
                  <ErrorMessage name="problemDescription" component="div" className="text-red-500 text-sm" />
                </div>
                {/* Other job details fields */}
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between">
              {step > 0 && <button type="button" onClick={prevStep} className="bg-gray-300 p-2 rounded">Previous</button>}
              {step < steps.length - 1 ? (
                <button type="button" onClick={nextStep} className="bg-blue-500 text-white p-2 rounded">Next</button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white p-2 rounded">
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobCard;
