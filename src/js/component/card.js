import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NotFound from '../../img/star_wars_404.png'
import { Context } from '../Store/appContext'
import { toastConfig } from '../../utils/toastConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Card = ({ element, type, searchId }) => {
  const { actions } = useContext(Context)

  const navigate = useNavigate()

  const isFavorite = actions.isFavorite(element.name)

  const handleFavorite = () => {
    try {
      if (isFavorite) {
        actions.deleteFavorite(element.name)
      } else {
        toast.success('Added to favorites! 😃', toastConfig)
        actions.addFavorite(element.name, type, element.uid || searchId)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error updating favorites. Please try again.', toastConfig)
    }
  }

  const arrayType = type === 'people' ? 'characters' : type

  const goToDetailView = () => {
    actions.cleanDetailView()
    actions.getDetailData({ type, id: element.uid || searchId })
    navigate(`${type}/${element.uid || searchId}`)
  }

  const takeUrl = element.url
  const idMatch = takeUrl.match(/\/(\d+)$/)
  const id = idMatch ? parseInt(idMatch[1]) : null

  return (
    <div
      className="mx-2 mb-4 col-3 max-w-sm bg-black border border-white rounded-lg "
      style={{ width: '16rem', height: '23rem' }}
    >
      <ToastContainer />
      <img
        className="rounded-t-lg border-b border-white"
        src={`https://starwars-visualguide.com/assets/img/${arrayType}/${
          element.uid || id
        }.jpg`}
        onError={(e) => {
          e.target.src = NotFound
        }}
        alt="card image"
        style={{
          width: '16rem',
          height: '15rem',
          objectFit: 'cover',
        }}
      />

      <div className="p-3 bg-black ">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-white ">
          {element.name}
        </h5>
        <div className="flex flex-row justify-between pt-2">
          <button
            onClick={goToDetailView}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-200 "
          >
            Learn more
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button className="btn cursor-pointer" onClick={handleFavorite}>
            {isFavorite ? (
              <i className="fas fa-heart text-warning"></i>
            ) : (
              <i className="far fa-heart text-warning"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
