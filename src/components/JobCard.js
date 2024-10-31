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
  status: Yup.string().required("Status is required"),
  creationDate: Yup.date().required("Creation date is required"),
  // completionDate: Yup.date().nullable(),
});

const JobCard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const technicianId = localStorage.getItem("technicianId") || "";

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true); // Indicate that form submission is in progress
    try {
      // Step 1: Post client data to /clients
      const clientResponse = await fetch("http://127.0.0.1:5000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.clientName,
          email: values.clientEmail,
          phone_number: values.clientPhone,
          address: values.clientAddress,
        }),
      });
  
      if (!clientResponse.ok) {
        enqueueSnackbar("Failed to submit client data.", { variant: "error" });
        return; // Exit if client creation fails
      }
  
      const clientData = await clientResponse.json();
      const clientId = clientData.id; // Extract client ID from response
  
      // Step 2: Post device data to /devices with clientId
      const deviceResponse = await fetch("http://127.0.0.1:5000/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_serial_number: values.deviceSerialNumber,
          device_model: values.deviceModel,
          brand: values.brand,
          hdd_or_ssd: values.hddOrSsd,
          hdd_or_ssd_serial_number: values.hddOrSsdSerialNumber,
          memory: values.memory,
          memory_serial_number: values.memorySerialNumber,
          battery: values.battery,
          battery_serial_number: values.batterySerialNumber,
          adapter: values.adapter,
          adapter_serial_number: values.adapterSerialNumber,
          client_id: clientId,
          warranty_status: values.warrantyStatus,
        }),
      });
  
      if (!deviceResponse.ok) {
        enqueueSnackbar("Failed to submit device data.", { variant: "error" });
        return; // Exit if device creation fails
      }
  
      const deviceData = await deviceResponse.json();
      const deviceId = deviceData.id; // Extract device ID from response
  
      // Step 3: Post job card data to /jobcards with deviceId
      const jobCardResponse = await fetch("http://127.0.0.1:5000/jobcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_description: values.problemDescription,
          status: "PENDING",
          device_id: deviceId,
        }),
      });
  
      if (!jobCardResponse.ok) {
        enqueueSnackbar("Failed to submit job card.", { variant: "error" });
        return; // Exit if job card creation fails
      }
  
      // If all requests succeed
      enqueueSnackbar("Job card submitted successfully!", { variant: "success" });
      resetForm(); // Clear form data
  
    } catch (error) {
      console.error("Error during job card submission:", error);
      enqueueSnackbar("An error occurred while submitting the job card.", { variant: "error" });
    } finally {
      setSubmitting(false); // Form submission complete
    }
  };
  


  

  return (
    <div className="min-h-screen flex items-center justify-center">
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
                {/* <InputField name="completionDate" label="Completion Date" type="date" /> */}
              </div>
            </FormikStepper.Step>
        </FormikStepper>
      </div>
    </div>
  );
};

export default JobCard;