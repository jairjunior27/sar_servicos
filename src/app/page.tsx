import { Header } from "@/components/header";
import { SigninForm } from "@/components/signinForm";

export default function Page () {
  return(
    <div className="">
      <Header/>
     <div className="p-6">
       <SigninForm/>
     </div>
    </div>
  )
}