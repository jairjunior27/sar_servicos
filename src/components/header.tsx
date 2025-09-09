import { ButtonHeader } from "./buttonHeader"
import { Logo } from "./logo"

export const Header = () =>{
    return(
        <header className="p-4 flex items-center justify-between">
            <Logo/> <ButtonHeader/>
        </header>
    )
}