import { useState } from 'react';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await signup(email, password);
    }

    return (
        <form className = "signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email: </label>
            <input 
                type = "email"
                onChange = {(event) => setEmail(event.target.value)}
                value = {email}
            ></input>
            <label>Password: </label>
            <input 
                type = "password"
                onChange = {(event) => setPassword(event.target.value)}
                value = {password}
            ></input>
            <button disabled = {isLoading}>Sign up</button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default Signup;