type prop = {
    classname: string
    type?: string
    placeholder: string
}

export const InputItem = ({classname,type,placeholder}: prop) =>{
    return (
        <div className="w-full">
            <input className={classname} placeholder={placeholder}/>
        </div>
    )
}