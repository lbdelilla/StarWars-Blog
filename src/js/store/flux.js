const URL_FETCH = 'https://swapi.tech/api'
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      starships: [],
      favorites: [],
      detailData: {},
      planets_next: '',
      people_next: '',
      starships_next: '',
      species_next: '',
      vehicles_next: '',
      searchData: [],
      searchType: '',
      searchUids: [],
      species: [],
      vehicles: [],
      isLoading: false,
    },
    actions: {
      getDataFromApi: async () => {
        const peopleUrl = `${URL_FETCH}/people`
        const planetsUrl = `${URL_FETCH}/planets`
        const starshipsUrl = `${URL_FETCH}/starships`
        const speciesUrl = `${URL_FETCH}/species`
        const vehiclesUrl = `${URL_FETCH}/vehicles`

        setStore({ isLoading: true })

        const fetchData = (url) =>
          fetch(url)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => console.error(err))

        const planetsPromise = fetchData(planetsUrl)
        const peoplePromise = fetchData(peopleUrl)
        const starshipsPromise = fetchData(starshipsUrl)
        const speciesPromise = fetchData(speciesUrl)
        const vehiclesPromise = fetchData(vehiclesUrl)

        const [planets, people, starships, species, vehicles] =
          await Promise.all([
            planetsPromise,
            peoplePromise,
            starshipsPromise,
            speciesPromise,
            vehiclesPromise,
          ])

        const planetsData = planets.results
        const peopleData = people.results
        const starshipsData = starships.results
        const speciesData = species.results
        const vehiclesData = vehicles.results

        const planets_next = planets.next
        const people_next = people.next
        const starships_next = starships.next
        const species_next = species.next
        const vehicles_next = vehicles.next

        setStore({
          planets: planetsData,
          people: peopleData,
          starships: starshipsData,
          planets_next,
          people_next,
          starships_next,
          species: speciesData,
          vehicles: vehiclesData,
          species_next,
          vehicles_next,
          isLoading: false,
        })
      },
      // getDataFromApi: async () => {
      //   const starWarsContent =
      //     JSON.parse(localStorage.getItem('starWarsContent')) || {}

      //   if (Object.keys(starWarsContent).length === 0) {
      //     const peopleUrl = `${URL_FETCH}/people`
      //     const planetsUrl = `${URL_FETCH}/planets`
      //     const starshipsUrl = `${URL_FETCH}/starships`
      //     const speciesUrl = `${URL_FETCH}/species`
      //     const vehiclesUrl = `${URL_FETCH}/vehicles`

      //     const fetchData = async (url) => {
      //       const response = await fetch(url)
      //       const data = await response.json()
      //       return data
      //     }

      //     const [planets, people, starships, species, vehicles] =
      //       await Promise.all([
      //         fetchData(planetsUrl),
      //         fetchData(peopleUrl),
      //         fetchData(starshipsUrl),
      //         fetchData(speciesUrl),
      //         fetchData(vehiclesUrl),
      //       ])

      //     starWarsContent.planets = planets.results
      //     starWarsContent.people = people.results
      //     starWarsContent.starships = starships.results
      //     starWarsContent.species = species.results
      //     starWarsContent.vehicles = vehicles.results

      //     localStorage.setItem(
      //       'starWarsContent',
      //       JSON.stringify(starWarsContent)
      //     )
      //   }

      //   const { planets, people, starships, species, vehicles } =
      //     starWarsContent

      //   setStore({
      //     planets,
      //     people,
      //     starships,
      //     species,
      //     vehicles,
      //     planets_next: planets.next,
      //     people_next: people.next,
      //     starships_next: starships.next,
      //     species_next: species.next,
      //     vehicles_next: vehicles.next,
      //   })
      // },
      getDetailData: async ({ type, id }) => {
        const url = `${URL_FETCH}/${type}/${id}`

        try {
          const response = await fetch(url)
          const data = await response.json()
          const detailData = {
            ...data.result.properties,
            description: data.result.description,
            uid: data.result.uid,
          }

          setStore({ detailData })

          localStorage.setItem('detailData', JSON.stringify(detailData))
        } catch (err) {
          console.error(err)
        }
      },
      getMoreData: async (url, type) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const existingData = getStore()[type]
            const newData = data.results

            const uniqueNewData = newData.filter((newItem) => {
              return !existingData.some(
                (existingItem) => existingItem.uid === newItem.uid
              )
            })

            const updatedData = existingData.concat(uniqueNewData)

            setStore({ [type]: updatedData, [`${type}_next`]: data.next })
          })
          .catch((err) => console.error(err))
      },
      // getMoreData: async (url, type) => {
      //   fetch(url)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       const existingData = [...getStore()[type]]
      //       const newData = data.results

      //       const uniqueNewData = newData.filter((newItem) => {
      //         return !existingData.some(
      //           (existingItem) => existingItem.uid === newItem.uid
      //         )
      //       })

      //       const updatedData = existingData.concat(uniqueNewData)

      //       setStore({ [type]: updatedData, [`${type}_next`]: data.next })

      //       const starWarsContent =
      //         JSON.parse(localStorage.getItem('starWarsContent')) || {}
      //       starWarsContent[type] = updatedData
      //       console.log(starWarsContent[type])
      //       console.log(updatedData)
      //       starWarsContent[`${type}_next`] = data.next
      //       localStorage.setItem(
      //         'starWarsContent',
      //         JSON.stringify(starWarsContent)
      //       )
      //     })
      //     .catch((err) => console.error(err))
      // },
      searchData: async (name, type) => {
        fetch(`${URL_FETCH}/${type}/?name=${name}`)
          .then((response) => response.json())
          .then((data) => {
            const newData = data.result

            setStore({
              searchData: newData,
              searchType: type,
            })
          })
          .catch((err) => console.error(err))
      },

      addFavorite: (name, category, id) => {
        const store = getStore()
        const newFavorite = { name, category, id }
        const newFavorites = [...store.favorites, newFavorite]
        setStore({ favorites: newFavorites })
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
      },
      deleteFavorite: (name) => {
        const store = getStore()
        const newFavorites = store.favorites.filter(
          (favorite) => favorite.name !== name
        )
        setStore({ favorites: newFavorites })
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
      },
      getFavorites: () => {
        const store = getStore()
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        if (favorites) {
          setStore({ favorites })
        }
      },
      isFavorite: (name) => {
        const favorites = getStore().favorites
        const favoriteName = favorites.map((element) => element.name)
        return favoriteName.includes(name)
      },
      cleanDetailView: () => {
        setStore({ detailData: {} })
      },
    },
  }
}

export default getState
