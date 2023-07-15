import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../Store/appContext'
import NotFound from '../../../src/img/star_wars_404.png'

export const DetailView = () => {
  const { store } = useContext(Context)
  const params = useParams()

  const elementType =
    params.category === 'people' ? 'characters' : params.category

  const detailData = JSON.parse(localStorage.getItem('detailData'))
  return (
    <section className="bg-black">
      <div className="jumbotron bg-black flex justify-center">
        {detailData ? (
          <div
            style={{ width: '70rem' }}
            className="m-3 flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={`https://starwars-visualguide.com/assets/img/${elementType}/${params.id}.jpg`}
              onError={(e) => {
                e.target.src = NotFound
              }}
              alt="element image"
              style={{ width: '20rem' }}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h3 className="mb-3 text-3xl font-bold tracking-tight text-white ">
                {detailData.name}
              </h3>
              {Object.keys(detailData).map((key) => {
                if (
                  key === 'created' ||
                  key === 'edited' ||
                  key === 'url' ||
                  key === 'homeworld' ||
                  key === 'uid' ||
                  key === 'description' ||
                  key === 'people'
                ) {
                  return null
                } else {
                  return (
                    <p key={key} className="my-1">
                      <span className="text-white ">
                        <strong>{key}: </strong>
                      </span>
                      <span className="text-white ">{detailData[key]}</span>
                    </p>
                  )
                }
              })}
            </div>
          </div>
        ) : null}
      </div>
      <Link to="/" className="flex flex-row justify-center">
        <span
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-3 py-2 text-center inline-flex items-center mb-3"
          href="#"
          role="button"
        >
          Back home
        </span>
      </Link>
    </section>
  )
}
