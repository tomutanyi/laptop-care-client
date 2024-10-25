import * as Yup from "yup";
import {
  FormikStepper,
  InputField,
  SelectField,
} from "formik-stepper";
import "formik-stepper/dist/style.css";
import { useSnackbar } from "notistack";

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
  // completionDate: Yup.date().nullable(),
});

const JobCard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const technicianId = localStorage.getItem("technicianId") || "";


  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/jobcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
            technician_id:technicianId,
            status: values.status,
            creation_date: new Date().toISOString(),
            completion_date: values.completionDate,
          },
        }),
      });

      if (response.ok) {
        enqueueSnackbar("Job card submitted successfully!", { variant: "success" });
        resetForm();
      } else {
        enqueueSnackbar("Failed to submit job card.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while submitting the job card.", { variant: "error" });
      console.error("Error submitting job card:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-yellow-50 to-yellow-100 flex items-center justify-center">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <FormikStepper
          onSubmit={onSubmit}
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
          technicianId: technicianId,
          status: "pending",
          creationDate: new Date().toISOString(),
          completionDate: "",
        }}
        validationSchema={JobCardSchema}
        withStepperLine
        nextButton={{
          label: "Next Step",
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition",
        }}
        prevButton={{
          label: "Previous",
          className: "bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition",
        }}
        submitButton={{
          label: "Submit",
          className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition",
        }}
        >
          {/* First Step: Client Information */}
          <FormikStepper.Step
            label="Client Info"
            labelColor="#37bf5e"
            circleColor="#37bf5e"
          >
            <div className="flex flex-col ">
              <InputField
                name="clientName" label="Client Name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="clientEmail" label="Email" type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="clientPhone" label="Client Phone"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="clientAddress" label="Client Address"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </FormikStepper.Step>

          {/* Second Step: Device Information */}
          <FormikStepper.Step label="Device Info" circleColor="#6f42c1">
            <div className="flex flex-col space-y-2">
              <InputField
                name="deviceModel" label="Device Model"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="deviceSerialNumber" label="Device Serial Number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="brand" label="Brand"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SelectField
                name="hddOrSsd"
                label="HDD/SSD Type"
                options={[
                  { value: "HDD", label: "HDD" },
                  { value: "SSD", label: "SSD" },
                ]}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="hddOrSsdSerialNumber" label="HDD/SSD Serial Number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="memory" label="Memory"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </FormikStepper.Step>

          {/*Step 3: More Device Information*/}
          <FormikStepper.Step label="Device Info" circleColor="#6f42c1">
            <div className="flex flex-col space-y-2" >
               <InputField
                name="memorySerialNumber" label="Memory Serial Number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="battery" label="Battery Type"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="batterySerialNumber" label="Battery Serial Number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <InputField
                name="adapter" label="Adapter Type"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputField
                name="adapterSerialNumber" label="Adapter Serial Number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SelectField
                name="warrantyStatus"
                label="Warranty Status"
                options={[
                  { value: "in_warranty", label: "In Warranty" },
                  { value: "out_of_warranty", label: "Out of Warranty" },
                ]}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </FormikStepper.Step>

          {/* Step 4: Job Details */}
            <FormikStepper.Step label="Job Details" labelColor="#37bf5e" circleColor="#37bf5e">
              <div className="space-y-4">
                <InputField as="textarea" name="problemDescription" label="Problem Description" rows="4" />
                <InputField name="technicianId" label="Technician ID" />
              <SelectField
                name="status"
                label="Status"
                labelColor="#dc3545"
                placeholder="Select"
                className="w-auto p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "in progress", label: "In progress" },
                  { value: "completed", label: "Completed" },
                ]}
              />
                {/* <InputField name="completionDate" label="Completion Date" type="date" /> */}
              </div>
            </FormikStepper.Step>
        </FormikStepper>
      </div>
    </div>
  );
};

export default JobCard;