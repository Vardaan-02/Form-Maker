import FormScreen from "@/components/form-screen";
import Sidebar from "@/components/sidebar";

export default function FormMaker() {
  return (
    <div className="min-h-screen flex justify-end">
      <Sidebar />
      <FormScreen />
    </div>
  );
}
