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
    const [visibleCategories, setVisibleCategories] = useState([]);

    const handleCategoryVisibilityToggle = (category) => {
        setVisibleCategories(prevCategories => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(cat => cat !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    const handleColorChange = (e) => {
        const selectedColor = e.target.value;
        setNewColor(selectedColor);
        setNewBookmark(prevState => ({
            ...prevState,
            color: selectedColor
        }));
    };

    const handleCreateBookmark = () => {
        if (newBookmark.title && newBookmark.url && newBookmark.url !== 'http://' && newBookmark.url !== 'https://') {
            const bookmarkData = { ...newBookmark, color: newColor };
            createBookmark(bookmarkData);
            setNewBookmark({ title: '', url: '', category: '' }); // Reset category after creating bookmark
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

    const handleUpdateBookmark = (id, updatedData) => {
        const updatedBookmarks = bookmarks.map(bookmark => {
            if (bookmark._id === id) {
                return { ...bookmark, ...updatedData };
            }
            return bookmark;
        });
    
        if (updatedData.hasOwnProperty('isImportant') && updatedData.isImportant) {
            const categoryBookmarks = updatedBookmarks.filter(bookmark => bookmark.category === updatedData.category);
            const sortedCategoryBookmarks = categoryBookmarks.sort((a, b) => {
                if (a.isImportant && !b.isImportant) return -1;
                if (!a.isImportant && b.isImportant) return 1;
                return 0;
            });
            const otherBookmarks = updatedBookmarks.filter(bookmark => bookmark.category !== updatedData.category);
            return [...sortedCategoryBookmarks, ...otherBookmarks];
        }
    
        return updatedBookmarks;
    };

    const handleColorChangeForBookmark = (id, color) => {
        updateBookmark(id, { color });
    };

    // Get unique categories from bookmarks
    const categories = [...new Set(bookmarks.map(bookmark => bookmark.category))];
    const prioritizedBookmarks = bookmarks.map(bookmark => ({ ...bookmark }));

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
                                value={newBookmark.title || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.urlInputContainer}>
                            <h3 className={styles.inputTitle}>URL:</h3>
                            <input
                                className={styles.input}
                                type="text"
                                name="url"
                                value={newBookmark.url || 'https://'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.categoryInputContainer}>
                            <h3 className={styles.inputTitle}>Category:</h3>
                            <input
                                className={styles.input}
                                type="text"
                                name="category"
                                value={newBookmark.category || ''}
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
                <h4>Category Folder</h4>
                <div className={styles.categoryVisibilityContainer}>
                    {categories.map(category => (
                        <div key={category} className={styles.categoryVisibilityItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={visibleCategories.includes(category)}
                                    onChange={() => handleCategoryVisibilityToggle(category)}
                                />
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
                {categories.map(category => (
                    visibleCategories.includes(category) && (
                        <div key={category} className={styles.bookmarksContainer}>
                            <h2>{category}</h2>
                            <div className={styles.bookmarks}>
                            {prioritizedBookmarks
                            .filter(bookmark => bookmark.category === category)
                            .sort((a, b) => (b.isImportant ? 1 : -1)) // Sort bookmarks within each category based on importance
                            .map(bookmark => (
                                <Bookmark
                                    key={bookmark._id}
                                    bookmark={bookmark}
                                    deleteAction={deleteBookmark}
                                    updateBookmark={updateBookmark}
                                    color={bookmark.color || newColor}
                                    handleColorChangeForBookmark={handleColorChangeForBookmark}
                                />
                            ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </>
    );
}
