/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import{OpenAIApi, Configuration} from 'openai'

const apiKey = "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"
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi (configuration);

function App() {
  const [input,setInput] = useState("");
  const [output,setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: input,
      max_tokens:256,
      temperature:0.9,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0
    });

    setOutput(response.data.choices[0].text);
  };
  return (
      <div className='bg-gray-900 text-gray-100 h-screen flex flex-col dark:bg-gray-800 dark:text-gray-50'>
        <div className='flex-1 overflow-y-scroll'>
          <div className='flex justify-end mt-2 mr-2'>
            {/* <div className='bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm'>
              Selamat datang di Bacain Ai!
            </div> */}
          </div>
          <div className='flex justify-start mt-2 ml-2'>
            {/* <div className='bg-gray-300 rounded-lg px-4 py-2 text-black max-w-sm'>
              Bisakah kamu membantuku?
            </div> */}
          </div>
          {
            output ? (
              <div className='flex justify-start mt-2 mr-2'>
              <div className='bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm'>
                {output}
              </div>
            </div>
            ) : null}
            <div className='flex justify-end mt-2 mr-2'>
            <div className='bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm'>
              {input}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center'>
              <input type="text" 
              className='w-full border rounded-lg py-2 px-4 dark:bg-gray-700 dark:text-gray-200'
              value={input}
              onChange={(e) =>  setInput(e.target.value)}
              placeholder='Ketik disini'
              />
              <button type='submit' className='bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2 text-white ml-2'>
                Kirim
                </button>
          </div>
        </form>
      </div>
  )
}

export default App
