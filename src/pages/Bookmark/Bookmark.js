import React, { useState, useEffect } from 'react';
import styles from './Bookmark.module.scss';

export default function Bookmark({ bookmark, deleteAction, updateBookmark, color }) {
    const [title, setTitle] = useState(bookmark.title);
    const [url, setUrl] = useState(bookmark.url);
    const [bookmarkColor, setBookmarkColor] = useState(color || '#f0f0f0'); // Default color state

    useEffect(() => {
        // Update the color state if the color prop changes
        setBookmarkColor(color || '#f0f0f0');
    }, [color]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleColorChange = (e) => {
        setBookmarkColor(e.target.value);
    };

    const handleSubmit = () => {
        updateBookmark(bookmark._id, { title, url, color: bookmarkColor });
    };

    const handleClick = (e) => {
        if (!e.target.closest('button')) {
            window.open(bookmark.url, '_blank');
        }
    };

    return (
        <div className={`${styles.bookmarkContainer} ${styles.customColor}`} style={{ backgroundColor: bookmarkColor }}>
            <form className={styles.bookmark}>
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
                <h4 className={styles.inputTitle}>Color:{' '}
                    <input
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </h4>
                <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Submit
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
