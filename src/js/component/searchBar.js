import React, { useContext, useState } from 'react'
import { Context } from '../Store/appContext'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const SearchBar = () => {
  const { actions } = useContext(Context)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('people')

  const handleSearch = (e, searchQuery, searchType) => {
    e.preventDefault()
    actions.searchData(searchQuery, searchType)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const options = [
    { value: 'people', label: 'Characters' },
    { value: 'planets', label: 'Planets' },
    { value: 'starships', label: 'Starships' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'species', label: 'Species' },
  ]
  const defaultOption = options[0]

  const _onSelect = (selectedOption) => {
    setSearchType(selectedOption.value)
  }

  return (
    <form
      className="bg-black p-5 flex justify-center "
      onSubmit={(e) => handleSearch(e, searchQuery, searchType)}
    >
      <div className="flex  bg-black text-white" style={{ width: '60rem' }}>
        <Dropdown
          options={options}
          onChange={_onSelect}
          value={defaultOption}
          className=""
        />
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-slate-900 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-l-gray-700  dark:border-slate-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-slate-500"
            placeholder="Search..."
            required
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-slate-900 rounded-r-lg border border-slate-600 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}
export default SearchBar
