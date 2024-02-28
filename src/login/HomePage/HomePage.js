import { useState, useEffect } from 'react';
import CreateForm from '../../components/CreateForm/CreateForm';
import Blogs from '../../components/Blogs/Blogs';
import styles from './HomePage.module.scss'; // Import the SCSS file

export default function HomePage(props) {
    const [blogs, setBlogs] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs();
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'));
            setShowCreate(true);
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <div className={styles.homePage}>
            <h1 className={styles.title}>Welcome to the Liberty Blog</h1>
            {showCreate ? (
                <div className={styles.createForm}>
                    <CreateForm user={props.user} createBlog={props.createBlog} token={props.token} />
                </div>
            ) : (
                <></>
            )}
            {blogs.length ? (
                <div className={styles.blogs}>
                    <Blogs blogs={blogs} />
                </div>
            ) : (
                <p className={styles.emptyMessage}>Sorry, our writers are lazy.</p>
            )}
        </div>
    );
}
