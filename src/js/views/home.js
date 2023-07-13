import React, { useContext } from 'react'
import { Context } from '../Store/appContext'
import LightSaber from '../../img/lightsaber.png'
import Planet from '../../img/planet.png'
import Starship from '../../img/starship.png'
import Vehicles from '../../img/vehicles.png'
import Species from '../../img/species.png'
import Card from '../component/card'
import List from '../component/list'
import SearchBar from '../component/searchBar'
import { toastConfig } from '../../utils/toastConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ShowData = () => {
  const { store, actions } = useContext(Context)
  const { people, planets, starships, searchData, vehicles, species } = store

  const people_next_page = store.people_next
  const planets_next_page = store.planets_next
  const starships_next_page = store.starships_next
  const vehicles_next_page = store.vehicles_next
  const species_next_page = store.species_next

  const handleClick = async (type, url) => {
    try {
      await actions.getMoreData(type, url)
      toast.success(
        'More loaded correctly! 😃 You should keep right! 👉',
        toastConfig
      )
    } catch (error) {
      console.error(error)
      toast.error('Error loading more data. Please try again.', toastConfig)
    }
  }

  const searchType = store.searchType
  const hasSearchResults = searchData.length > 0
  return (
    <>
      <section className="bg-starwars">
        <ToastContainer />
        <SearchBar />
      </section>
      {hasSearchResults ? (
        <section className="bg-black">
          <div className="flex items-center">
            <div className=" overflow-x-auto">
              <ul className="flex flex-row">
                {searchData.map((elem) => (
                  <Card
                    key={elem.properties?.url}
                    element={elem.properties}
                    type={searchType}
                    searchId={elem.uid}
                  />
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-black">
          <div>
            <h2 className="text-white flex text-2xl font-bold p-10">
              Characters{' '}
              <img
                className="mx-3"
                src={LightSaber}
                alt="cute light saber image"
                style={{ width: '30px' }}
              />
            </h2>
            <List data={people} type={'people'} />
            <div className="flex flex-row justify-end mr-10">
              <button
                onClick={() => {
                  handleClick(people_next_page, 'people')
                }}
                type="button"
                className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Load More...
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white text-2xl flex font-bold m-10">
              Planets{' '}
              <img
                className="mx-3"
                src={Planet}
                alt="cute light saber image"
                style={{ width: '30px' }}
              />
            </h2>
            <List data={planets} type={'planets'} />
            <div className="flex flex-row justify-end mr-10">
              <button
                onClick={() => {
                  handleClick(planets_next_page, 'planets')
                }}
                type="button"
                className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Load More...
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white text-2xl flex font-bold m-10">
              Starships{' '}
              <img
                className="mx-3"
                src={Starship}
                alt="cute light saber image"
                style={{ width: '30px' }}
              />
            </h2>
            <List data={starships} type={'starships'} />
            <div className="flex flex-row justify-end mr-10">
              <button
                onClick={() => {
                  handleClick(starships_next_page, 'starships')
                }}
                type="button"
                className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Load More...
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white flex text-2xl font-bold p-10">
              Vehicles{' '}
              <img
                className="mx-3"
                src={Vehicles}
                alt="cute light saber image"
                style={{ width: '30px' }}
              />
            </h2>
            <List data={vehicles} type={'vehicles'} />
            <div className="flex flex-row justify-end mr-10">
              <button
                onClick={() => {
                  handleClick(vehicles_next_page, 'vehicles')
                }}
                type="button"
                className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Load More...
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white flex text-2xl font-bold p-10">
              Species{' '}
              <img
                className="mx-3"
                src={Species}
                alt="cute light saber image"
                style={{ width: '30px' }}
              />
            </h2>
            <List data={species} type={'species'} />
            <div className="flex flex-row justify-end mr-10">
              <button
                onClick={() => {
                  handleClick(species_next_page, 'species')
                }}
                type="button"
                className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Load More...
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ShowData
