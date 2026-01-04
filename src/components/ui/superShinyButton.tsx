
interface SuperShinyButtonProps{
    children?:React.ReactNode;
    onClick?: ()=>void;
}

export function SuperShinyButton({children,onClick}:SuperShinyButtonProps){
    return <button onClick={onClick} className="px-10 py-3 bg-red-500">
        {children}
    </button>
}