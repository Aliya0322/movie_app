/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main_page/loadMovieDetails.js":
/*!***************************************!*\
  !*** ./main_page/loadMovieDetails.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadMovieDetails: () => (/* binding */ loadMovieDetails)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main_page/main.js\");\n\n\n\nasync function loadMovieDetails(movieId){\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.searchList.classList.add('hide-search-list');\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.movieSearchBox.value = \"\";\n    const result = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e15683b`);\n    const movieDetails = await result.json();\n    (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.displayMovieDetails)(movieDetails);\n}\n\n//# sourceURL=webpack://movie_app/./main_page/loadMovieDetails.js?");

/***/ }),

/***/ "./main_page/loadMovies.js":
/*!*********************************!*\
  !*** ./main_page/loadMovies.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main_page/main.js\");\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadMovies);\n\n\nasync function loadMovies(searchTerm){\n    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e15683b`;\n    const res = await fetch(URL);\n    const data = await res.json();\n    if (data.Response === \"True\") {\n        (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.displayMovieList)(data.Search);\n    } else {\n        console.error(\"Фильмы не найдены\");\n    }\n}\n\n//# sourceURL=webpack://movie_app/./main_page/loadMovies.js?");

/***/ }),

/***/ "./main_page/main.js":
/*!***************************!*\
  !*** ./main_page/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayMovieDetails: () => (/* binding */ displayMovieDetails),\n/* harmony export */   displayMovieList: () => (/* binding */ displayMovieList),\n/* harmony export */   movieSearchBox: () => (/* binding */ movieSearchBox),\n/* harmony export */   searchList: () => (/* binding */ searchList)\n/* harmony export */ });\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./main_page/style.css\");\n/* harmony import */ var _loadMovies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadMovies.js */ \"./main_page/loadMovies.js\");\n/* harmony import */ var _loadMovieDetails_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadMovieDetails.js */ \"./main_page/loadMovieDetails.js\");\n\n\n\n\n\n\n\nconst movieSearchBox = document.getElementById('movie-search-box');\nconst searchList = document.getElementById('search-list');\nconst resultGrid = document.getElementById('result-grid');\nconst addToFavoritesBtn = document.getElementById('add-to-favorites');\n\n\nfunction findMovies(){\n    let searchTerm = (movieSearchBox.value).trim();\n    if(searchTerm.length > 0){\n        searchList.classList.remove('hide-search-list');\n        (0,_loadMovies_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(searchTerm);\n    } else {\n        searchList.classList.add('hide-search-list');\n    }\n}\n\n\nfunction displayMovieList(movies) {\n    searchList.innerHTML = \"\";\n    movies.forEach(movie => {\n        let movieListItem = document.createElement('div');\n        movieListItem.dataset.id = movie.imdbID;\n        movieListItem.classList.add('search-list-item');\n\n        let moviePoster = (movie.Poster !== \"N/A\") ? movie.Poster : \"assets/image_not_found.png\";\n\n        movieListItem.innerHTML = `\n        <div class=\"search-item-thumbnail\">\n            <img src=\"${moviePoster}\">\n        </div>\n        <div class=\"search-item-info\">\n            <h3>${movie.Title}</h3>\n            <p>${movie.Year}</p>\n        </div>\n        `;\n\n        searchList.appendChild(movieListItem);\n\n        movieListItem.addEventListener(\"click\", () => (0,_loadMovieDetails_js__WEBPACK_IMPORTED_MODULE_2__.loadMovieDetails)(movie.imdbID));\n    });\n}\n\nconst debounce = (fn, ms) =>{\n    let timeout;\n    return function (...args) {\n        clearTimeout(timeout);\n        timeout=setTimeout(()=> fn(...args), ms)\n    };\n}\n\nconst debouncedFindMovies = debounce(findMovies, 500);\nmovieSearchBox.addEventListener('input', debouncedFindMovies);\n\nfunction displayMovieDetails(details) {\n    resultGrid.innerHTML = `\n        <div class=\"movie-poster\">\n            <img src=\"${(details.Poster != \"N/A\") ? details.Poster : \"assets/image_not_found.png\"}\" alt=\"movie poster\">\n            <div class=\"add-to-favorites\" id=\"add-to-favorites\">\n                <i class=\"fas fa-star\"></i>\n                <span>Добавить в избранное</span>\n            </div>\n        </div>\n        <div class=\"movie-info\">\n            <h3 class=\"movie-title\">${details.Title}</h3>\n            <ul class=\"movie-misc-info\">\n                <li class=\"year\">Year: ${details.Year}</li>\n                <li class=\"rated\">Рейтинг:<br>${details.Rated}</li>\n                <li class=\"released\">Премьера:<br>${details.Released}</li>\n            </ul>\n            <p class=\"genre\"><b>Жанр:</b> ${details.Genre}</p>\n            <p class=\"writer\"><b>Режиссер:</b> ${details.Writer}</p>\n            <p class=\"actors\"><b>Актеры:</b> ${details.Actors}</p>\n            <p class=\"plot\"><b>Сюжет:</b> ${details.Plot}</p>\n            <p class=\"awards\"><b><i class=\"fas fa-award\"></i></b>${details.Awards}</p>\n        </div>`;\n\n    const addToFavoritesBtn = document.getElementById('add-to-favorites');\n    \n    addToFavoritesBtn.addEventListener('click', () => addToFavorites(details));\n}\n\nwindow.addEventListener('click', (event) => {\n    if (!event.target.classList.contains('form-control')) {\n        searchList.classList.add('hide-search-list');\n    }\n});\n\nasync function addToFavorites(movie) {\n    try {\n        const response = await fetch('/api/favorites', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify({\n                imdbID: movie.imdbID,\n                Title: movie.Title,\n                Year: movie.Year,\n                Poster: movie.Poster\n            })\n        });\n\n        const data = await response.json();\n        alert(data.message);\n    } catch (error) {\n        console.error(\"Ошибка добавления в избранное:\", error);\n    }\n}\n\n\n\n\n//# sourceURL=webpack://movie_app/./main_page/main.js?");

/***/ }),

/***/ "./main_page/style.css":
/*!*****************************!*\
  !*** ./main_page/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./main_page/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://movie_app/./main_page/style.css?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./main_page/style.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./main_page/style.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\nbody{\n    font-family: 'Inter', sans-serif;\n}\n\nimg{\n    width: 100%;\n    display: block;\n}\n\n.wrapper{\n    min-height: 100vh;\n    background-color: #171717;\n}\n\n.wrapper .container{\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 1rem;\n}\n\n.search-container {\n    background-color: #1d1d1d;\n    height: 180px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.logo{\n    padding: 1rem 0;\n    border-bottom: 1px solid #292929;\n}\n.logo p{\n    font-size: 2rem;\n    color: #fff;\n    font-weight: bold;\n}\n.logo p span{\n    color: #d4aa11;\n}\n\n.menu ul {\n    display: flex;\n    gap: 20px;\n    list-style: none; \n    padding: 0;\n    margin: 0;\n    gap: 20px;\n}\n\n.menu ul li {\n    display: inline-block;\n}\n\n\n.menu a {\n    text-decoration: none; \n    color: #fff;\n    font-size: 16px;\n}\n.search-element {\n    display: flex;\n    align-items: stretch;\n    justify-content: center;\n    flex-direction: column;\n    position: relative;\n}\n.search-element h3 {\n    align-self: center;\n    margin-right: 1rem;\n    font-size: 2rem;\n    color: #fff;\n    font-weight: 500;\n    margin-bottom: 1.5rem;\n}\n\n.search-element .form-control {\n    padding: 1rem 2rem;\n    font-size: 1rem;\n    border: none;\n    border-radius: 3px 0 0 3px;\n    outline: none;\n    color: #292929;\n    width: 400px;\n}\n\n.search-list {\n    position: absolute;\n    right: 0;\n    top: 100%;\n    max-height: 500px;\n    overflow-y: auto;\n    z-index: 10;\n}\n.search-list .search-list-item {\n    background-color: #292929;\n    padding: 0.5rem;\n    border-bottom: 1px solid #171717;\n    width: calc(400px - 8px);\n    color: #fff;\n    cursor: pointer;\n    transition: background-color 200ms ease;\n}\n\n.search-list .search-list-item:hover {\n    background-color: #1f1f1f;\n}\n\n.search-list-item {\n    display: flex;\n    align-items: center;\n}\n\n.search-item-thumbnail img{\n    width: 40px;\n    margin-right: 1rem;\n}\n.search-item-info h3{\n    font-weight: 600;\n    font-size: 1rem;\n}\n.search-item-info p{\n    font-size: 0.8rem;\n    margin-top: 0.5rem;\n    font-weight: 600;\n    opacity: 0.6;\n}\n\n\n.search-list::-webkit-scrollbar{\n    width: 8px;\n}\n.search-list::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #1d1d1d;\n    border-radius: 10px;\n}\n\n.search-list::-webkit-scrollbar-thumb {\n    background-color: #d4aa11;\n    border-radius: 10px;\n    border: 2px solid #1d1d1d;\n}\n\n.hide-search-list{\n    display: none;\n}\n\n\n/* Информация о фильме */\n.result-container{\n    padding: 3rem 0;\n}\n.movie-poster img{\n    max-width: 300px;\n    margin: 0 auto;\n    border: 4px solid #fff;\n}\n.movie-info{\n    text-align: center;\n    color: #fff;\n    padding-top: 3rem;\n}\n\n.movie-title{\n    font-size: 2rem;\n    color: #d4aa11;\n}\n.movie-misc-info {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 1rem;\n}\n.movie-info .year{\n    font-weight: 600;\n}\n.movie-info .rated{\n    background-color: #d4aa11;\n    padding: 0.4rem;\n    margin: 0 0.4rem;\n    border-radius: 3px;\n    font-weight: 600;\n}\n.movie-info .released{\n    font-weight: 600;\n}\n.movie-info .writer{\n    padding: 0.5rem;\n    margin: 1rem 0;\n}\n\n.movie-info .plot{\n    max-width: 400px;\n    margin: 1rem auto;\n}\n\n.movie-info .awards{\n    font-weight: 300;\n    font-size: 0.9rem;\n}\n.movie-info .awards i{\n    color: #d4aa11;\n    margin: 1rem 0.7rem 0 0;\n}\n\n/* Стили для блока \"Добавить в избранное\" */\n.add-to-favorites {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    padding: 0.5rem;\n    color: #d4aa11;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    margin-top: 0.5rem;\n    border-radius: 4px;\n}\n\n.add-to-favorites i {\n    font-size: 1.2rem;\n}\n\n.add-to-favorites span {\n    font-size: 1rem;\n    font-weight: 500;\n}\n\n@media (max-width: 450px) {\n    .logo p {\n        font-size: 1.4rem;\n    }\n\n    .menu a {\n        font-size: 1.4rem;\n    }\n    \n    .search-element .form-control {\n        width: 90%;\n        margin: 0 auto;\n        padding: 0.5rem 1rem;\n    }\n\n    .search-element h3 {\n        font-size: 1.4rem;\n    }\n\n    .search-list {\n        width: 90%;\n        right: 50%;\n        transform: translateX(50%);\n    }\n\n    .search-list .search-list-item {\n        width: 100%;\n    }\n\n    .movie-misc-info {\n        flex-direction: column;\n    }\n\n    .movie-misc-info li:nth-child(2) {\n        margin: 0.8rem 0;\n    }\n}\n\n@media (min-width: 800px) {\n    .search-element {\n        flex-direction: row;\n    }\n\n    .search-element h3 {\n        margin-bottom: 0;\n    }\n\n    .result-grid {\n        display: grid;\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .movie-info {\n        text-align: left;\n        padding-top: 0;\n    }\n\n    .movie-info .movie-misc-info {\n        justify-content: flex-start;\n        padding-left: 0;\n    }\n\n    .movie-info .plot {\n        margin-left: 0;\n    }\n\n    .movie-info .writer {\n        padding-left: 0;\n        margin-left: 0;\n    }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://movie_app/./main_page/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://movie_app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://movie_app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://movie_app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main_page/main.js");
/******/ 	
/******/ })()
;