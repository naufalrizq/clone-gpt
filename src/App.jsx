import { useState, useEffect } from 'react';
import { OpenAIApi, Configuration } from 'openai';

const apiKey = "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";
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: input,
      max_tokens: 256,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const newMessage = {
      sender: 'user',
      content: input
    };

    const newResponse = {
      sender: 'gpt',
      content: response.data.choices[0].text
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, newResponse]);
    setInput('');
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className='bg-gray-900 text-gray-100 h-screen flex flex-col dark:bg-gray-800 dark:text-gray-50'>
      <div className='flex-1 overflow-y-scroll'>
      {messages.map((message, index) => (
  <div
    key={index}
    className={`flex mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div
      className={`${
        message.sender === 'user' ? 'bg-green-500' : 'bg-green-500'
      } rounded-lg px-4 py-2 text-black max-w-sm`}
    >
      {message.content}
    </div>
  </div>
))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <input
            type='text'
            className='w-full border rounded-lg py-2 px-4 dark:bg-gray-700 dark:text-gray-200'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ketik disini'
          />
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2 text-white ml-2'
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
