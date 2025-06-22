import logo from '../assets/logo.png'
export const Navbar = () => {
    return <nav className='flex items-center rounded-b-sm shadow'>
        <div className='flex items-center w-3/5 md:w-1/3'>
            <img src={logo} alt="logo-navbar" className='h-[4rem] md:h-[6rem]'/>
            <h2 className='font-extrabold text-xl md:text-2xl text-blue-400'>Lazy Player</h2>
        </div>
        <ul className='flex gap-2 md:gap-10 md:text-xl font-bold px-1'>
            <li>Music</li>
            <li>Songs</li>
            <li>Metals</li>
        </ul>
    </nav>
}