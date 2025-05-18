import { useState } from 'react';
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await login(identifier, password);
    }

    return ( 
        <form className = "login" onSubmit = {handleSubmit}>
            <h3>Log in</h3>
            <label>Username or Email: </label>
            <input 
                type = "text"
                onChange = {(event) => setIdentifier(event.target.value)}
                value = {identifier}
            ></input>
            <label>Password: </label>
            <input 
                type = "password"
                onChange = {(event) => setPassword(event.target.value)}
                value = {password}
            ></input>
            <button disabled = {isLoading}>Log in</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default Login;