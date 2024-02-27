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
    const [newColor, setNewColor] = useState('#000000'); // Default color for new bookmarks

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setNewColor(selectedColor); // Update the default color to the selected color
        setNewBookmark(prevState => ({
            ...prevState,
            color: selectedColor // Set the color of new bookmarks to the selected color
        }));
    };

    const handleCreateBookmark = () => {
        if (newBookmark.title && newBookmark.url && newBookmark.url !== 'http://' && newBookmark.url !== 'https://') {
            const bookmarkData = { ...newBookmark, color: newColor }; // Include the currently selected color
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

    const handleColorChangeForBookmark = (id, color) => {
        updateBookmark(id, { color });
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
                                    value={newColor}
                                    onChange={handleColorChange}
                                />
                            </h3>
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
                                color={bookmark.color || newColor} // Use the bookmark's color if available, otherwise default to newColor
                                handleColorChangeForBookmark={handleColorChangeForBookmark}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
