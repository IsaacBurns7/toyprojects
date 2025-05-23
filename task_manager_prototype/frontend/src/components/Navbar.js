import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleLogout = () => {
        logout();
    }
    return (
        <header>
            <div className = "container">
                <Link to = "/">
                    <h1>Task Manager</h1>
                </Link>
                <nav>
                    {user && 
                    (<div>
                        <span>{user.username}</span>
                        <button onClick = {handleLogout}>Log out</button>
                    </div>)}

                    {!user && 
                    (<div>
                        <Link to = "/login">Log in</Link>
                        <Link to = "/signup">Sign up</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;