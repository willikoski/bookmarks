import React, { useState } from 'react';
import styles from './Bookmark.module.scss';

export default function Bookmark({ bookmark, deleteAction, updateBookmark, color, bookmarks }) {
    const [title, setTitle] = useState(bookmark.title || '');
    const [url, setUrl] = useState(bookmark.url || '');
    const [category, setCategory] = useState(bookmark.category || '');
    const [bookmarkColor, setBookmarkColor] = useState(color || '#f0f0f0');
    const [isImportant, setIsImportant] = useState(bookmark.isImportant || false);
    const [notes, setNotes] = useState(bookmark.notes || '');
    const [isEditingNotes, setIsEditingNotes] = useState(false); 

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
        const updatedData = { ...bookmark, isImportant: !isImportant };
        setIsImportant(!isImportant);
        updateBookmark(bookmark._id, updatedData);
    };

    const handleNotesChange = (e) => {
        const newNotes = e.target.value;
        console.log('New Notes:', newNotes);
        setNotes(newNotes);
    };

    const handleSubmit = async () => {
        try {
            await updateBookmark(bookmark._id, { title, url, category, color: bookmarkColor, isImportant, notes });
            setIsEditingNotes(false); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (e) => {
        if (!e.target.closest('button')) {
            window.open(bookmark.url, '_blank');
        }
    };

    return (
        <div className={`${styles.bookmarkContainer} ${styles.customColor}`} style={{ backgroundColor: bookmarkColor }}>
            <form className={styles.bookmark}>
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
                <div className={styles.notes}>
                    <h4 onClick={() => setIsEditingNotes(true)}>
                        Description
                        <span role="img" aria-label="Pencil" className={styles.editIcon}>✏️</span> 
                    </h4>
                    {isEditingNotes ? (
                        <textarea
                            name="notes"
                            className={styles.notesInput}
                            value={notes}
                            onChange={handleNotesChange}
                            onBlur={() => setIsEditingNotes(false)}
                        />
                    ) : (
                        <p>{notes}</p>
                    )}
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
