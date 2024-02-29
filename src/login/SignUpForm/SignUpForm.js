import { useState } from 'react'
import styles from './SignUpForm.module.scss'

export default function SignUpForm(props){
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
        setError(''); // Clear any previous errors when user starts typing
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if required fields are filled out
            if (!credentials.name || !credentials.email || !credentials.password) {
                setError('Please fill out all fields.');
                return;
            }
            // Submit the form
            await props.signUp(credentials);
        } catch (error) {
            setError('Sign-up failed. Please try again.');
            console.error('Sign-up error:', error);
        }
    };

    return(
        <>
            <h2 className={styles.heading}>Sign Up </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type='text' name="name" onChange={handleChange} value={credentials.name} placeholder="Your Name" />
                <input type='email' name="email" onChange={handleChange} value={credentials.email} placeholder="Your Email" />
                <input type='password' name="password" onChange={handleChange} value={credentials.password} placeholder="Your Password" />
                <input type="submit" value="Submit" />
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
}
