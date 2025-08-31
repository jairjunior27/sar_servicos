import { AuthPrivate } from "@/components/authPrivate";
import { Header } from "@/components/header";
import { SigninForm } from "@/components/signinForm";

export default function Page () {
  return(
    <AuthPrivate>   
      <div className="">
      <Header/>
     <div className="p-6">
       <SigninForm/>
     </div>
    </div>
     </AuthPrivate>  
  )
}