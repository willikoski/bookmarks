import { useState, useEffect } from 'react'
import BookmarkList from './pages/BookmarkList/BookmarkList'
import AuthPage from './login/AuthPage/AuthPage';
import styles from './App.module.scss';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [completedBookmarks, setCompletedBookmarks] = useState([]);
    const [newBookmark, setNewBookmark] = useState({ title: '', url: '' });
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null); // Define the user state

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            setLoggedIn(true);
        }
    }, []);

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Set user after successful sign-up
                setToken(data.token); // Set token after successful sign-up
                setLoggedIn(true);
                console.log('Sign up successful:', data);
            } else {
                const errorMessage = await response.text();
                console.error('Sign up failed:', errorMessage);
            }
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setToken(data.token);
                setLoggedIn(true);
                console.log('Login successful:', data);
                await getBookmarks(data);
            } else {
                const errorMessage = await response.text();
                console.error('Login failed:', errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    
     //createBookmarks
     const createBookmark = async () => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({...newBookmark})
            })
            const data = await response.json()
            setBookmarks([data,...bookmarks])
            setNewBookmark({
                title: '',
                url: ''
            })
        } catch (error) {   
            console.error(error)
        }
    }

    //

    // UpdateBookmark
    const updateBookmark = async (id, bookmarkToUpdate) => {
        console.log(id, bookmarkToUpdate);
        const body = { ...bookmarkToUpdate };
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the authentication token
                },
                body: JSON.stringify(body)
            });
            const updatedBookmark = await response.json();
            const updatedBookmarks = bookmarks.map(bookmark => {
                if (bookmark._id === id) {
                    return updatedBookmark;
                }
                return bookmark;
            });
            setBookmarks(updatedBookmarks);
            setNewBookmark({ title: '', url: '' });
        } catch (error) {
            console.error(error);
        }
    };

    //deleteBookmarks
    const deleteBookmark = async (id) => {
        try {
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id)
            const bookmarksCopy = [...bookmarks]
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await response.json()
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }
    
    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id);
            const bookmarksCopy = [...bookmarks];
            const subject = bookmarksCopy[index];
            
            // Update the bookmark status to completed
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...subject, completed: true }) // Assuming there's a field 'completed' to mark bookmark as completed
            });
            
            if (response.ok) {
                // Remove the bookmark from active bookmarks
                bookmarksCopy.splice(index, 1);
                setBookmarks(bookmarksCopy);
                
                // Add the bookmark to completed bookmarks
                const updatedBookmark = await response.json();
                setCompletedBookmarks([updatedBookmark, ...completedBookmarks]);
            } else {
                console.error('Failed to move bookmark to completed:', response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };
    //getBookmarks
    const getBookmarks = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from storage
            const response = await fetch('/api/bookmarks', { // Adjusted the fetch request to retrieve all bookmarks
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}` // Include token in headers
                }
            });
            if (response.ok) {
                const foundBookmarks = await response.json();
                setBookmarks(foundBookmarks.reverse());
            } else {
                console.error('Failed to fetch bookmarks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    };

    useEffect(() => {
        if (loggedIn && token) {
            getBookmarks();
        }
    }, [loggedIn, token]);

    return (
        <div className={styles.App}>
            {!loggedIn ? (
                <AuthPage login={login} signUp={signUp} />
            ) : (
                <BookmarkList
                    newBookmark={newBookmark}
                    setNewBookmark={setNewBookmark}
                    createBookmark={createBookmark}
                    bookmarks={bookmarks}
                    updateBookmark={updateBookmark}
                    moveToCompleted={moveToCompleted}
                    completedBookmarks={completedBookmarks}
                    deleteBookmark={deleteBookmark}
                />
            )}
        </div>
    );
}