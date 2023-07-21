import React, { useRef, useState } from 'react'
import Card from './card'

const List = ({ data, type }) => {
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollRight, setScrollRight] = useState(0)
  const containerRef = useRef(null)

  const handleScrollLeft = () => {
    const container = containerRef.current
    container.scrollLeft -= 300
    setScrollLeft(container.scrollLeft)
  }

  const handleScrollRight = () => {
    const container = containerRef.current
    container.scrollLeft += 300
    setScrollRight(container.scrollRight)
  }

  return (
    <section>
      <div className="flex items-center">
        <button
          className="prev px-1 flex items-center justify-center"
          onClick={handleScrollLeft}
        >
          <i className="fa-solid fa-circle-left text-white text-2xl"></i>
        </button>
        <div className=" overflow-x-auto overflow-x-hidden " ref={containerRef}>
          <ul className="flex flex-row">
            {data.map((elem) => (
              <Card key={elem.url} element={elem} type={type} />
            ))}
          </ul>
        </div>
        <button
          className="next px-2 flex items-center justify-center"
          onClick={handleScrollRight}
        >
          <i className="fa-solid fa-circle-right text-white text-2xl"></i>
        </button>
      </div>
    </section>
  )
}

export default List
