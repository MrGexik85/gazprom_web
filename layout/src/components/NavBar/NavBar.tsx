import '../../styles/NavBar/NavBar.sass'
import Logo from './Logo'

export function NavBarComponent() {
    return (
        <div id='navbar'>
            <div className='container'>
                <Logo />
            </div>
        </div>
    )
}