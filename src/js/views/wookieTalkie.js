import React, { useState } from 'react'
import { translations } from '../component/wookieABC'

const WookieTalkie = () => {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const translateToWookiee = (inputText) => {
    const translateText = inputText
      .toLowerCase()
      .split('')
      .map((char) => translations[char] || char)
      .join('')

    setTranslatedText(translateText)
  }

  return (
    // <div className="flex flex-row justify-center py-5 bg-black">
    //   <div
    //     className="bg-black flex flex-column gap-5"
    //     style={{ width: '30rem' }}
    //   >
    //     <div className="flex flex-row justify-between">
    //       <textarea
    //         value={inputText}
    //         onChange={(event) => setInputText(event.target.value)}
    //         placeholder="Write something..."
    //         style={{ width: '10rem' }]
    //       />
    //       <button className="text-white" onClick={translateToWookiee}>
    //         Lets Wookiee Talk
    //       </button>
    //     </div>
    //     <textarea
    //       value={translatedText}
    //       readOnly
    //       placeholder="waahrascwoaoworc cooaoraaoahoowh wawocworcao..."
    //     />
    //   </div>
    // </div>
    <section className="bg-black flex flex-row justify-center py-3">
      <div className="  w-full max-w-sm p-4 border  rounded-lg shadow sm:p-6 md:p-8 bg-black-500 border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Lets Wookiee Talk!
          </h5>
          <div>
            <label
              htmlFor="textT"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type in something...
            </label>
            <textarea
              type="text-area"
              name="textToTranslate"
              id="textT"
              className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Hello there!"
              required
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your translation...
            </label>
            <textarea
              type="text-area"
              name="translation"
              id="translation"
              placeholder="waahrascwoaoworc cooaoraaoahoowh wawocworcao..."
              className="h-40 bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              readOnly
              value={translatedText}
            />
          </div>
          <button
            type="button"
            className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            onClick={() => translateToWookiee(inputText)}
          >
            Translate
          </button>
        </form>
      </div>
    </section>
  )
}

export default WookieTalkie
