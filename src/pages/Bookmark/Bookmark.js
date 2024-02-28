import React, { useState } from 'react';
import styles from './Bookmark.module.scss';

export default function Bookmark({ bookmark, deleteAction, updateBookmark, color, bookmarks }) {
    const [title, setTitle] = useState(bookmark.title || '');
    const [url, setUrl] = useState(bookmark.url || '');
    const [category, setCategory] = useState(bookmark.category || '');
    const [bookmarkColor, setBookmarkColor] = useState(color || '#f0f0f0');
    const [isImportant, setIsImportant] = useState(bookmark.isImportant || false); // set to or false state

    const handleTitleChange = (e) => {
        const titleValue = e.target.value;
        const capitalizedTitle = titleValue.charAt(0).toUpperCase() + titleValue.slice(1);
        setTitle(capitalizedTitle);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const handleCategoryChange = (e) => {
        const categoryValue = e.target.value;
        const capitalizedCategory = categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
        setCategory(capitalizedCategory);
    };

    const handleColorChange = (e) => {
        const selectedColor = e.target.value || '#000000';
        setBookmarkColor(selectedColor);
    };

    const handleIsImportantToggle = () => {
        const updatedData = { ...bookmark, isImportant: !isImportant }; // toggle the important state
        setIsImportant(!isImportant); 
        updateBookmark(bookmark._id, updatedData); 
    };

    const handleSubmit = () => {
        updateBookmark(bookmark._id, { title, url, category, color: bookmarkColor, isImportant });
    };

    const handleClick = (e) => {
        if (!e.target.closest('button')) {
            window.open(bookmark.url, '_blank');
        }
    };

    return (
        <div className={`${styles.bookmarkContainer} ${styles.customColor}`} style={{ backgroundColor: bookmarkColor }}>
            <form className={styles.bookmark}>
                {/* Checkable button to mark as important */}
                <div className={styles.importantButtonContainer}>
                    <button
                        type="button"
                        className={`${styles.importantButton} ${isImportant ? styles.importantActive : ''}`}
                        onClick={handleIsImportantToggle}
                    >
                        {isImportant ? '★' : '☆'}
                    </button>
                </div>
                <input
                    name="title"
                    className={styles.titleInput}
                    value={title}
                    onChange={handleTitleChange}
                />
                <div className={styles.bookmarkUrl}>
                    <input
                        name="url"
                        className={styles.urlInput}
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <div className={styles.bookmarkCategory}>
                    <h4>Category</h4>
                    <input
                        name="category"
                        className={styles.categoryInput}
                        value={category}
                        onChange={handleCategoryChange}
                    />
                </div>
                <h4 className={styles.inputTitle}>Color:{' '}
                    <input
                        type="color"
                        value={bookmarkColor}
                        onChange={handleColorChange}
                    />
                </h4>
                <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </form>
            <div>
                <button className={styles.button} onClick={() => deleteAction(bookmark._id)}>
                    Delete
                </button>
                <div className={styles.visitBtnContainer} onClick={handleClick}>
                    <a className={styles.visitBtn} target="_blank" href={bookmark.url}>
                        VISIT
                    </a>
                </div>
                <div className={styles.animation}></div>
            </div>
        </div>
    );
}
