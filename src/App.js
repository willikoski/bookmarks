import { useState, useEffect } from 'react'
import BookmarkList from './pages/BookmarkList/BookmarkList'
import styles from './App.module.scss'


export default function App(){
    const [bookmarks, setBookmarks] = useState([])
    const [completedBookmarks, setCompletedBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({
        title: '',
        url: ''
    })

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [token, setToken] = useState('')
    // Login
    const login = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'Post',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password})
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)
        }
    }

    // Signup
    const signup = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'Post',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
            })
            const tokenResponse = await response.json()
            setToken(tokenResponse)
            localStorage.setItem('token', JSON.stringify(tokenResponse))
        } catch (error) {
            console.error(error)
        }
    }

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
        console.log(id, bookmarkToUpdate)
        const body = { ...bookmarkToUpdate }
        try {
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const updatedBookmark = await response.json()
            const updatedBookmarks = bookmarks.map(bookmark => {
                if (bookmark._id === id) {
                    return updatedBookmark
                }
                return bookmark;
            });
            setBookmarks(updatedBookmarks)
            setNewBookmark({ title: '', url: '' })
        } catch (error) {
            console.error(error)
        }
    }

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
            const index = bookmarks.findIndex((bookmark) => bookmark._id === id)
            const bookmarksCopy = [...bookmarks]
            const subject = bookmarksCopy[index]
            const response = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedBookmark = await response.json()
            const completedBMsCopy = [updatedBookmark, ...completedBookmarks]
            setCompletedBookmarks(completedBMsCopy)
            bookmarksCopy.splice(index, 1)
            setBookmarks(bookmarksCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //getBookmarks
    const getBookmarks = async () => {
        try{
            const response = await fetch('/api/bookmarks')
            const foundBookmarks = await response.json()
            setBookmarks(foundBookmarks.reverse())
            const responseTwo = await fetch('/api/bookmarks/completed')
            const foundCompletedBookmarks = await responseTwo.json()
            setCompletedBookmarks(foundCompletedBookmarks.reverse())
        } catch(error){
            // console.error(error)
        }
    }
    useEffect(() => {
        getBookmarks()
    }, [])
    return (
        <div className={styles.App}>
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
        </div>
    )
}