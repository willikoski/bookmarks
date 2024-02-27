/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_BookmarkList_BookmarkList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/BookmarkList/BookmarkList */ "./src/pages/BookmarkList/BookmarkList.js");
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.module.scss */ "./src/App.module.scss");
/* provided dependency */ var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



function App() {
  const [bookmarks, setBookmarks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [completedBookmarks, setCompletedBookmarks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [newBookmark, setNewBookmark] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    title: '',
    url: ''
  });
  const [credentials, setCredentials] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    email: '',
    password: '',
    name: ''
  });
  const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  // Login
  const login = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'Post',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });
      const tokenResponse = await response.json();
      setToken(tokenResponse);
      localStorage.setItem('token', JSON.stringify(tokenResponse));
    } catch (error) {
      console.error(error);
    }
  };

  // Signup
  const signup = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'Post',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_objectSpread({}, credentials))
      });
      const tokenResponse = await response.json();
      setToken(tokenResponse);
      localStorage.setItem('token', JSON.stringify(tokenResponse));
    } catch (error) {
      console.error(error);
    }
  };

  //createBookmarks
  const createBookmark = async () => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(token)
        },
        body: JSON.stringify(_objectSpread({}, newBookmark))
      });
      const data = await response.json();
      setBookmarks([data, ...bookmarks]);
      setNewBookmark({
        title: '',
        url: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  //

  // UpdateBookmark
  const updateBookmark = async (id, bookmarkToUpdate) => {
    console.log(id, bookmarkToUpdate);
    const body = _objectSpread({}, bookmarkToUpdate);
    try {
      const response = await fetch("/api/bookmarks/".concat(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
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
      setNewBookmark({
        title: '',
        url: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  //deleteBookmarks
  const deleteBookmark = async id => {
    try {
      const index = bookmarks.findIndex(bookmark => bookmark._id === id);
      const bookmarksCopy = [...bookmarks];
      const response = await fetch("/api/bookmarks/".concat(id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await response.json();
      bookmarksCopy.splice(index, 1);
      setBookmarks(bookmarksCopy);
    } catch (error) {
      console.error(error);
    }
  };

  //moveToCompleted
  const moveToCompleted = async id => {
    try {
      const index = bookmarks.findIndex(bookmark => bookmark._id === id);
      const bookmarksCopy = [...bookmarks];
      const subject = bookmarksCopy[index];
      const response = await fetch("/api/bookmarks/".concat(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      });
      const updatedBookmark = await response.json();
      const completedBMsCopy = [updatedBookmark, ...completedBookmarks];
      setCompletedBookmarks(completedBMsCopy);
      bookmarksCopy.splice(index, 1);
      setBookmarks(bookmarksCopy);
    } catch (error) {
      console.error(error);
    }
  };
  //getBookmarks
  const getBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      const foundBookmarks = await response.json();
      setBookmarks(foundBookmarks.reverse());
      const responseTwo = await fetch('/api/bookmarks/completed');
      const foundCompletedBookmarks = await responseTwo.json();
      setCompletedBookmarks(foundCompletedBookmarks.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getBookmarks();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_2__["default"].App
  }, /*#__PURE__*/React.createElement(_pages_BookmarkList_BookmarkList__WEBPACK_IMPORTED_MODULE_1__["default"], {
    newBookmark: newBookmark,
    setNewBookmark: setNewBookmark,
    createBookmark: createBookmark,
    bookmarks: bookmarks,
    updateBookmark: updateBookmark,
    moveToCompleted: moveToCompleted,
    completedBookmarks: completedBookmarks,
    deleteBookmark: deleteBookmark
  }));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* provided dependency */ var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");




const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById("app"));
root.render( /*#__PURE__*/React.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, null, /*#__PURE__*/React.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/React.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))));

/***/ }),

/***/ "./src/pages/BookmarkList/BookmarkList.js":
/*!************************************************!*\
  !*** ./src/pages/BookmarkList/BookmarkList.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BookmarkList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookmarkList.module.scss */ "./src/pages/BookmarkList/BookmarkList.module.scss");
/* harmony import */ var _Bookmark_Bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Bookmark/Bookmark */ "./src/pages/Bookmark/Bookmark.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



function BookmarkList(_ref) {
  let {
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark,
    updateBookmark
  } = _ref;
  const [newColor, setNewColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#000000'); // Default color for new bookmarks

  const handleColorChange = e => {
    const selectedColor = e.target.value;
    setNewColor(selectedColor); // Update the default color to the selected color
    setNewBookmark(prevState => _objectSpread(_objectSpread({}, prevState), {}, {
      color: selectedColor // Set the color of new bookmarks to the selected color
    }));
  };
  const handleCreateBookmark = () => {
    if (newBookmark.title && newBookmark.url && newBookmark.url !== 'http://' && newBookmark.url !== 'https://') {
      const bookmarkData = _objectSpread(_objectSpread({}, newBookmark), {}, {
        color: newColor
      }); // Include the currently selected color
      createBookmark(bookmarkData);
      setNewBookmark({
        title: '',
        url: ''
      });
    }
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setNewBookmark(_objectSpread(_objectSpread({}, newBookmark), {}, {
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleCreateBookmark();
  };
  const handleColorChangeForBookmark = (id, color) => {
    updateBookmark(id, {
      color
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "William's Bookmarks"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].inputContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].banner
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit,
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].form
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].titleInputContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].inputTitle
  }, "Website Title:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input,
    type: "text",
    name: "title",
    value: newBookmark.title,
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].urlInputContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].inputTitle
  }, "URL:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].input,
    type: "text",
    name: "url",
    value: newBookmark.url ? newBookmark.url : 'https://',
    onChange: handleChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].colorInputContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].inputTitle
  }, "Color:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "color",
    value: newColor,
    onChange: handleColorChange
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].submitButton
  }, "Create Bookmark"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].bookmarksContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].bookmarks
  }, bookmarks.map(bookmark => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Bookmark_Bookmark__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: bookmark._id,
    bookmark: bookmark,
    deleteAction: deleteBookmark,
    updateBookmark: updateBookmark,
    color: bookmark.color || newColor // Use the bookmark's color if available, otherwise default to newColor
    ,
    handleColorChangeForBookmark: handleColorChangeForBookmark
  }))))));
}

/***/ }),

/***/ "./src/pages/Bookmark/Bookmark.js":
/*!****************************************!*\
  !*** ./src/pages/Bookmark/Bookmark.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bookmark)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bookmark.module.scss */ "./src/pages/Bookmark/Bookmark.module.scss");


function Bookmark(_ref) {
  let {
    bookmark,
    deleteAction,
    updateBookmark,
    color
  } = _ref;
  const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(bookmark.title || '');
  const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(bookmark.url || '');
  const [bookmarkColor, setBookmarkColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(color || '#f0f0f0'); // Initialize with the provided color or default color

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleUrlChange = e => {
    setUrl(e.target.value);
  };
  const handleColorChange = e => {
    const selectedColor = e.target.value || '#000000'; // Ensure the selected color is always defined
    setBookmarkColor(selectedColor);
  };
  const handleSubmit = () => {
    updateBookmark(bookmark._id, {
      title,
      url,
      color: bookmarkColor
    });
  };
  const handleClick = e => {
    if (!e.target.closest('button')) {
      window.open(bookmark.url, '_blank');
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "".concat(_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].bookmarkContainer, " ").concat(_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].customColor),
    style: {
      backgroundColor: bookmarkColor
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].bookmark
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    name: "title",
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].titleInput,
    value: title,
    onChange: handleTitleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].bookmarkUrl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    name: "url",
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].urlInput,
    value: url,
    onChange: handleUrlChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].inputTitle
  }, "Color:", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "color",
    value: bookmarkColor,
    onChange: handleColorChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].submitButton,
    onClick: handleSubmit
  }, "Update")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].button,
    onClick: () => deleteAction(bookmark._id)
  }, "Delete"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].visitBtnContainer,
    onClick: handleClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].visitBtn,
    target: "_blank",
    href: bookmark.url
  }, "VISIT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].animation
  })));
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss ***!
  \********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgray;
}

.KTmxx2sH00E53HXHCND1 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.KTmxx2sH00E53HXHCND1 img {
  width: 50%;
  max-height: 300px;
}
.KTmxx2sH00E53HXHCND1 h1 {
  width: 100%;
  text-align: center;
  color: rgba(23, 5, 58, 0.8);
}`, "",{"version":3,"sources":["webpack://./src/App.module.scss"],"names":[],"mappings":"AAAA;EACI,SAAA;EACA,iBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,2BAAA;AACJ;;AAEA;EACI,WAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,sBAAA;AACJ;AAAI;EACI,UAAA;EACA,iBAAA;AAER;AAAI;EACI,WAAA;EACA,kBAAA;EACA,2BAAA;AAER","sourcesContent":["body {\n    margin: 0;\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: lightgray;\n}\n\n.banner{\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    img {\n        width: 50%;\n        max-height: 300px;\n    }\n    h1 {\n        width: 100%;\n        text-align: center;\n        color: rgba(23,5, 58, 0.8);\n    }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"banner": `KTmxx2sH00E53HXHCND1`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/BookmarkList/BookmarkList.module.scss":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/BookmarkList/BookmarkList.module.scss ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `h1 {
  font-size: 2.6rem;
  text-align: center;
}

.EfM3FnXytL0pZ6vbOYfF {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  text-align: center;
}

.o8kAw9G3yl3GB_gcB0mO {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.1rem;
}

.jgL81WkuFFYyDz8joU2i {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stnIg5JLsgZh_oh5Z6Ah,
.LRmhrX9sRQclmvmt6Yqn,
.nsJMLGO4A_WLKB8FGbq1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.1rem;
}

.FdPloNH0SCfsG2Q1YmNB {
  font-size: 1.8rem;
  margin-bottom: 0.1rem;
}

.uSUeHgF0rT9whNCeoJVE {
  width: 20rem;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.bJFxMgCiMINrThG6PD7X {
  width: 20rem;
  height: 3rem;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.bJFxMgCiMINrThG6PD7X:hover {
  background-color: #0056b3;
}

.zzGhBoS7i10WluoqF9YU {
  display: flex;
  flex-wrap: wrap; /* Allow bookmarks to wrap into multiple rows */
  justify-content: flex-start; /* Align bookmarks to the left */
  gap: 20px; /* Add gap between bookmarks */
}

.JdYmsaK6Va4jI_Bb0rwl {
  width: 250px; /* Set a fixed width for each bookmark */
  margin-bottom: 20px; /* Add space between rows */
  max-width: 1000px;
}`, "",{"version":3,"sources":["webpack://./src/pages/BookmarkList/BookmarkList.module.scss"],"names":[],"mappings":"AAAA;EACI,iBAAA;EACA,kBAAA;AACJ;;AAEA;EACI,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;AACJ;;AAEA;EACI,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,qBAAA;AACJ;;AACA;EACI,aAAA;EACA,sBAAA;EACA,mBAAA;AAEJ;;AACA;;;EAGI,aAAA;EACA,sBAAA;EACA,qBAAA;AAEJ;;AACA;EACI,iBAAA;EACA,qBAAA;AAEJ;;AACA;EACI,YAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,sBAAA;EACA,kBAAA;AAEJ;;AACA;EACI,YAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,WAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,sCAAA;AAEJ;;AACA;EACI,yBAAA;AAEJ;;AACA;EACI,aAAA;EACA,eAAA,EAAA,+CAAA;EACA,2BAAA,EAAA,gCAAA;EACA,SAAA,EAAA,8BAAA;AAEJ;;AACE;EACE,YAAA,EAAA,wCAAA;EACA,mBAAA,EAAA,2BAAA;EACA,iBAAA;AAEJ","sourcesContent":["h1 {\n    font-size: 2.6rem;\n    text-align: center;\n}\n\n.container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    font-size: 1.6rem;\n    text-align: center;\n}\n\n.inputContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: .1rem;\n}\n.form {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.titleInputContainer,\n.urlInputContainer,\n.colorInputContainer { \n    display: flex;\n    flex-direction: column;\n    margin-bottom: .1rem;\n}\n\n.inputTitle {\n    font-size: 1.8rem;\n    margin-bottom: 0.1rem;\n}\n\n.input {\n    width: 20rem;\n    height: 3rem;\n    padding: 0.5rem;\n    font-size: 1.6rem;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n}\n\n.submitButton {\n    width: 20rem;\n    height: 3rem;\n    margin-top: .1rem;\n    margin-bottom: 1rem;\n    font-size: 1.6rem;\n    color: #fff;\n    background-color: #007bff;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.submitButton:hover {\n    background-color: #0056b3;\n}\n\n.bookmarks {\n    display: flex;\n    flex-wrap: wrap; /* Allow bookmarks to wrap into multiple rows */\n    justify-content: flex-start; /* Align bookmarks to the left */\n    gap: 20px; /* Add gap between bookmarks */\n  }\n  \n  .bookmarkContainer {\n    width: 250px; /* Set a fixed width for each bookmark */\n    margin-bottom: 20px; /* Add space between rows */\n    max-width: 1000px;\n  }"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": `EfM3FnXytL0pZ6vbOYfF`,
	"inputContainer": `o8kAw9G3yl3GB_gcB0mO`,
	"form": `jgL81WkuFFYyDz8joU2i`,
	"titleInputContainer": `stnIg5JLsgZh_oh5Z6Ah`,
	"urlInputContainer": `LRmhrX9sRQclmvmt6Yqn`,
	"colorInputContainer": `nsJMLGO4A_WLKB8FGbq1`,
	"inputTitle": `FdPloNH0SCfsG2Q1YmNB`,
	"input": `uSUeHgF0rT9whNCeoJVE`,
	"submitButton": `bJFxMgCiMINrThG6PD7X`,
	"bookmarks": `zzGhBoS7i10WluoqF9YU`,
	"bookmarkContainer": `JdYmsaK6Va4jI_Bb0rwl`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/Bookmark/Bookmark.module.scss":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/Bookmark/Bookmark.module.scss ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.sJ6qn1dnpDKJTkaDmNSu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
}

.oJ9X8gvh1NbtlN0_ptQT {
  width: 90%;
  max-width: 400px;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.iiZQqKHUeUH64okrQHej,
.tHdNfenGVX3mNj0aZ0ub {
  width: 90%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.O8GRq8pVttBMpyHOvqBN {
  margin-top: 0.1rem;
}

.aPdPX3lavkiEt7rmZgWt {
  width: 100%;
  height: 3rem;
  margin-top: 0.1rem;
  font-size: 1.6rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.aPdPX3lavkiEt7rmZgWt:hover {
  background-color: #0056b3;
}

.JRnMJGhsdr7J7gdRuRgT {
  margin-top: 0.1rem;
  font-size: 1.4rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.JRnMJGhsdr7J7gdRuRgT:hover {
  background-color: #c82333;
}

.ESLpFZlkcqCtVSg0HlSa {
  margin-top: 0.1rem;
}

.wamawOBfHva2wT7ezPwV {
  font-size: 1.4rem;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}
.wamawOBfHva2wT7ezPwV:hover {
  text-decoration: underline;
}`, "",{"version":3,"sources":["webpack://./src/pages/Bookmark/Bookmark.module.scss"],"names":[],"mappings":"AAAA;EACI,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,aAAA;EACA,kBAAA;AACJ;;AAEA;EACI,UAAA;EACA,gBAAA;EACA,aAAA;EACA,yBAAA;EACA,sBAAA;EACA,kBAAA;AACJ;;AAEA;;EAEI,UAAA;EACA,YAAA;EACA,eAAA;EACA,iBAAA;EACA,sBAAA;EACA,kBAAA;AACJ;;AAEA;EACI,kBAAA;AACJ;;AAEA;EACI,WAAA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,sCAAA;AACJ;AACI;EACI,yBAAA;AACR;;AAGA;EACI,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,sCAAA;AAAJ;AAEI;EACI,yBAAA;AAAR;;AAIA;EACI,kBAAA;AADJ;;AAIA;EACI,iBAAA;EACA,cAAA;EACA,qBAAA;EACA,eAAA;AADJ;AAGI;EACI,0BAAA;AADR","sourcesContent":[".bookmarkContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: 1rem;\n    border-radius: 5px;\n}\n\n.bookmark {\n    width: 90%;\n    max-width: 400px; \n    padding: 1rem;\n    background-color: #ffffff; \n    border: 1px solid #ccc;\n    border-radius: 5px;\n}\n\n.titleInput,\n.urlInput {\n    width: 90%;\n    height: 3rem;\n    padding: 0.5rem;\n    font-size: 1.6rem;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n}\n\n.colorInput {\n    margin-top: .1rem;\n}\n\n.submitButton {\n    width: 100%;\n    height: 3rem;\n    margin-top: .1rem;\n    font-size: 1.6rem;\n    color: #fff;\n    background-color: #007bff;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n\n    &:hover {\n        background-color: #0056b3;\n    }\n}\n\n.button {\n    margin-top: .1rem;\n    font-size: 1.4rem;\n    color: #fff;\n    background-color: #dc3545;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n\n    &:hover {\n        background-color: #c82333;\n    }\n}\n\n.visitBtnContainer {\n    margin-top: .1rem;\n}\n\n.visitBtn {\n    font-size: 1.4rem;\n    color: #007bff;\n    text-decoration: none;\n    cursor: pointer;\n\n    &:hover {\n        text-decoration: underline;\n    }\n}"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"bookmarkContainer": `sJ6qn1dnpDKJTkaDmNSu`,
	"bookmark": `oJ9X8gvh1NbtlN0_ptQT`,
	"titleInput": `iiZQqKHUeUH64okrQHej`,
	"urlInput": `tHdNfenGVX3mNj0aZ0ub`,
	"colorInput": `O8GRq8pVttBMpyHOvqBN`,
	"submitButton": `aPdPX3lavkiEt7rmZgWt`,
	"button": `JRnMJGhsdr7J7gdRuRgT`,
	"visitBtnContainer": `ESLpFZlkcqCtVSg0HlSa`,
	"visitBtn": `wamawOBfHva2wT7ezPwV`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/App.module.scss":
/*!*****************************!*\
  !*** ./src/App.module.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../node_modules/sass-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./App.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/pages/BookmarkList/BookmarkList.module.scss":
/*!*********************************************************!*\
  !*** ./src/pages/BookmarkList/BookmarkList.module.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./BookmarkList.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/BookmarkList/BookmarkList.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_BookmarkList_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/pages/Bookmark/Bookmark.module.scss":
/*!*************************************************!*\
  !*** ./src/pages/Bookmark/Bookmark.module.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./Bookmark.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/pages/Bookmark/Bookmark.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_Bookmark_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"App": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbig_poppa_code_react_starter_kit"] = self["webpackChunkbig_poppa_code_react_starter_kit"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-354ecd"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=App.2ee4913f630130098384ba73ef5809ab.js.map