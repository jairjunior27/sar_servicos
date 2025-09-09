import { SigninForm } from "@/components/signinForm";
import { Header } from "../components/header";

export default function Page() {
  return (
    <div className="">
      <Header />
      <div className="p-6  ">

          <SigninForm />
      
      </div>
    </div>
  );
}
