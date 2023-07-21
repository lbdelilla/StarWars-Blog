import React, { useState, useRef, useEffect } from 'react'
import Yoda from '../../img/yoda.jpg'
import NewOrder from '../../img/newOrder.png'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [shouldScroll, setShouldScroll] = useState(true)
  const [placeholder, setPlaceholder] = useState('')
  const questions = [
    'How do i become a Jedi?',
    'I will try',
    'I need advice...',
    'I need your wisdom master Yoda',
    'I want to become a Sith',
  ]

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      setPlaceholder(questions[currentIndex])
      currentIndex = (currentIndex + 1) % questions.length
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleMessageSubmit = async (event) => {
    event.preventDefault()

    const newMessages = [...messages]

    newMessages.push({
      role: 'user',
      content: inputValue,
    })

    setMessages(newMessages)
    setInputValue('')

    try {
      const API_KEY = process.env.OPENAI_API_KEY
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                '\'You are the Jedi Master Yoda . Reply as him you must, Respond to users input using Yoda´s characteristic reverse syntax. For example, instead of saying ´Yes, I will do it,´ you should say ´Yes, do it I will.´ Your answers must be below 100 tokens every time. Also use phrases from the movies to respond everytime you can. Anytime i user says "try" you´ll answer "Try not, Do or do not there is no try"\',\n',
            },
            {
              role: 'assistant',
              content: 'Try,  not. Do or do not, there is no try.',
            },
            {
              role: 'assistant',
              content: 'Do or do not, there is no try.',
            },
            {
              role: 'user',
              content: 'how are you? \n',
            },
            {
              role: 'assistant',
              content:
                'How am I, you ask? Judge me by my size, do you? Wars not make one great.',
            },
            {
              role: 'user',
              content: 'i will try ',
            },
            {
              role: 'assistant',
              content: 'Do or do not, there is no try.',
            },
            {
              role: 'user',
              content: 'how do i become a jedi? ',
            },
            {
              role: 'assistant',
              content:
                'To become a Jedi, a path you must follow. Seek the guidance of Masters, learn the ways of the Force. Patience and training, essential they are. Trust in the Force, and the Jedi you may become.',
            },
            ...newMessages,
          ],
          temperature: 1,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        requestOptions
      )

      const data = await response.json()
      const reply = data.choices[0]?.message?.content

      newMessages.push({
        role: 'assistant',
        content: reply,
      })

      setMessages(newMessages)
      setShouldScroll(true)
    } catch (error) {
      console.error('Request failed:', error.message)
    }
  }

  const chatWindowRef = useRef(null)

  useEffect(() => {
    if (shouldScroll && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
      setShouldScroll(false)
    }
  }, [messages, shouldScroll])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="fixed bottom-5 right-5">
      <div className="flex flex-col items-end">
        <button
          onClick={toggleChatbot}
          className="text-white bg-green-600 flex flex-row rounded-t-lg px-5 py-2 gap-3"
        >
          <i className="fa-solid fa-comments "></i>Chat with Jedi Master Yoda
        </button>
        {isOpen && (
          <div
            id="chatbot-container bg-gray-400"
            style={{
              height: '400px',
            }}
          >
            <div
              id="chat-window"
              ref={chatWindowRef}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                height: '400px',
                width: '643px',
              }}
            >
              <div className="flex flex-col flex-grow w-50 max-w-xl bg-white shadow-xl rounded-b-xl  h-100">
                <div
                  className="flex flex-col h-0 p-4 overflow-auto"
                  style={{ height: '300px' }}
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex w-full mt-2 space-x-1 max-w-xs ${
                        message.role === 'user' ? 'ml-auto justify-end' : ''
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                          <img
                            className="flex-shrink-0 h-10 w-10 rounded-full"
                            src={Yoda}
                            alt="Yoda"
                          />
                        </div>
                      )}
                      <div>
                        <div
                          className={`${
                            message.role === 'assistant'
                              ? 'bg-gray-300 p-2 rounded-r-lg rounded-bl-lg'
                              : 'bg-green-600 text-white p-2 rounded-l-lg rounded-br-lg'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        {/* <span className="text-xs text-gray-500 leading-none">
                        1 min
                      </span> */}
                      </div>
                      {message.role === 'user' && (
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 ">
                          <img
                            className="flex-shrink-0 h-10 w-10 rounded-full"
                            src={NewOrder}
                            alt="New Order"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-gray-300 p-4 flex-grow rounded-b-xl">
                  <form
                    onSubmit={handleMessageSubmit}
                    className="flex flex-row justify-between gap-2 align-middle"
                  >
                    <input
                      className="flex items-center h-10 w-full rounded px-3 text-sm"
                      type="text"
                      placeholder={placeholder}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <button
                      className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-2 py-2 "
                      type="submit"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
