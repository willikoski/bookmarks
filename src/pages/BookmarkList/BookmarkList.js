import React, { useState } from 'react';
import styles from './BookmarkList.module.scss';
import Bookmark from '../Bookmark/Bookmark';

export default function BookmarkList({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark,
    updateBookmark
}) {
    const [color, setColor] = useState('#f0f0f0'); // Default color for new bookmarks

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setColor(selectedColor);
    };
    const handleCreateBookmark = () => {
        if (newBookmark.title && newBookmark.url && newBookmark.url !== 'http://' && newBookmark.url !== 'https://') {
            const bookmarkData = { ...newBookmark, color };
            console.log(bookmarkData); // Add this line to check the bookmark data being passed
            createBookmark(bookmarkData);
            setNewBookmark({ title: '', url: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookmark({ ...newBookmark, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateBookmark();
    };

    return (
        <>
            <h1>William's Bookmarks</h1>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <div className={styles.banner}></div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.titleInputContainer}>
                            <h3 className={styles.inputTitle}>Website Title:</h3>
                            <input
                                className={styles.input}
                                type="text"
                                name="title"
                                value={newBookmark.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.urlInputContainer}>
                            <h3 className={styles.inputTitle}>URL:</h3>
                            <input
                                className={styles.input}
                                type="text"
                                name="url"
                                value={newBookmark.url ? newBookmark.url : 'https://'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.colorInputContainer}>
                            <h3 className={styles.inputTitle}>Color:{' '}
                            <input
                                type="color"
                                value={color}
                                onChange={handleColorChange}
                            /></h3>
                        </div>
                        <button type="submit" className={styles.submitButton}>Create Bookmark</button>
                    </form>
                </div>
                <div className={styles.bookmarksContainer}>
                    <div className={styles.bookmarks}>
                        {bookmarks.map(bookmark => (
                            <Bookmark
                                key={bookmark._id}
                                bookmark={bookmark}
                                deleteAction={deleteBookmark}
                                updateBookmark={updateBookmark}
                                color={color} // Pass color to the Bookmark component
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}