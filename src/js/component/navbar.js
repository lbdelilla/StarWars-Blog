import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../img/starwars.png'
import Wookie from '../../img/wookie.png'
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
      <div className="md:max-w-screen-xl flex flex-col sm:flex-wrap md:flex-row items-center justify-between mx-auto p-4">
        <div className="flex md:justify-start justify-center w-full md:w-auto md:order-1">
          <ul className="flex flex-row  bg-black md:flex-row md:space-x-8 md:border-0 ">
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
              className="md:mr-3"
              alt="Star Wars Logo"
              style={{ width: '220px' }}
            />
          </a>
        </div>
        <div className="flex sm:justify-center md:order-3">
          <Link
            to="/wookie-talkie"
            type="button"
            className="flex-row focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mr-2  text-center inline-flex items-center"
          >
            Wookiee Talkie{' '}
            <img
              src={Wookie}
              className="ml-1"
              alt="Wookie"
              style={{ width: '25px' }}
            />
          </Link>
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            type="button"
          >
            Favorites {favorites.length}
            <i className="fa-solid fa-angle-down ml-2"></i>
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
        </div>
      </div>
    </nav>
  )
}
