import React, { useContext } from 'react'
import List from './list'
import { PropagateLoader } from 'react-spinners'
import { Context } from '../Store/appContext'

const ContentSection = ({ title, image, data, type, onClickLoadMore }) => {
  const { store } = useContext(Context)

  const isLoading = store.isLoading

  return (
    <div>
      <h2 className="text-white flex text-2xl font-bold p-10">
        {title}{' '}
        <img
          className="mx-3"
          src={image}
          alt="cute light saber image"
          style={{ width: '30px' }}
        />
      </h2>
      {isLoading ? (
        <div className="flex justify-center">
          <PropagateLoader color="#AC0101" />
        </div>
      ) : (
        <>
          <List data={data} type={type} />
          <div className="flex flex-row justify-end mr-10">
            <button
              onClick={onClickLoadMore}
              type="button"
              className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Load More...
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ContentSection
