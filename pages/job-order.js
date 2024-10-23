import JobOrderForm from "../components/JobOrderForm";
export default function JobOrderPage() {
    return (
      <div>
      <h1 className="text-2xl font-bold text-gray-600 text-center mb-6">Create a New Job Order</h1>
      <JobOrderForm />
      </div>
    );
  }