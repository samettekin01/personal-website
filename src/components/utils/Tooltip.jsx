function Tooltip({ children, text }) {
    return (
        <div className="relative group flex items-center justify-center">
            <div
                className="absolute bg-slate-900 top-7 left-1 
            opacity-0 before:content-[''] p-2 rotate-45 rounded-sm
            transition-opacity group-hover:flex group-hover:opacity-100
            [clip-path:polygon(0%_0%,0%_70%,70%_0%)]"></div>
            <div
                className='absolute text-sm whitespace-nowrap 
                bg-slate-900 p-1 rounded-md z-20 top-8 opacity-0 
                transition-opacity group-hover:flex group-hover:opacity-100'
            >
                <span className='text-white'>
                    {text}
                </span>
            </div>
            {children}
        </div>
    )
}

export default Tooltip