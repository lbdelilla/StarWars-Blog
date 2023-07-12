import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../img/starwars.png'
import { Context } from '../Store/appContext'

export const Navbar = () => {
  const { store, actions } = useContext(Context)
  const favorites = store.favorites
  const handleDeleteFav = (name) => {
    actions.deleteFavorite(name)
  }

  const handleFavoriteClick = (type, id) => {
    if (type && id) {
      actions.cleanDetailView()
      actions.getDetailData({ type, id })
    } else {
      console.log('Type and/or id are undefined')
    }
  }

  return (
    <nav className="bg-black border-gray-200 " id="navbar-cta">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-sta justify-start w-full md:w-auto md:order-1">
          <ul className="flex flex-col   bg-black md:flex-row md:space-x-8 md:border-0 ">
            <a href="https://www.luciabelen.dev" target="_blank">
              <li className="block py-2 px-2  text-white text-2xl rounded md:bg-transparent  md:p-0 ">
                <i className="fa-solid fa-globe"></i>
              </li>
            </a>
            <a href="https://www.github.com/lbdelilla" target="_blank">
              <li className="block py-2 px-2 text-white text-2xl rounded md:bg-transparent  md:p-0 ">
                <i className="fa-brands fa-github"></i>
              </li>
            </a>
            <a href="https://www.linkedin.com/in/luciabelen" target="_blank">
              <li className="block py-2 px-2 text-white text-2xl rounded md:bg-transparent  md:p-0 ">
                <i className="fa-brands fa-linkedin"></i>
              </li>
            </a>
          </ul>
        </div>
        <div className="flex items-center justify-center md:order-2">
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              className="mr-3"
              alt="Star Wars Logo"
              style={{ width: '220px' }}
            />
          </a>
        </div>
        <div className="flex md:order-3">
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Favorites {favorites.length}
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            id="dropdownHover"
            className="z-10 hidden bg-dark divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              {favorites.length > 0 &&
                favorites.map((item) => (
                  <div
                    key={item.name + item.category}
                    className="flex flex-row justify-between m-2 hover:bg-gray-600 "
                  >
                    <Link
                      to={`${item.category}/${item.id}`}
                      onClick={() =>
                        handleFavoriteClick(item.category, item.id)
                      }
                      className=" block px-4 "
                    >
                      <li>{item.name}</li>
                    </Link>
                    <i
                      className="fa-solid fa-xmark flex align-self-center"
                      onClick={() => handleDeleteFav(item.name)}
                    ></i>
                  </div>
                ))}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
