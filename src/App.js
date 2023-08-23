import React, { useState, useEffect } from "react";
import "./App.css";
import History from "./components/History";
import { Configuration } from 'openai';
import { OpenAIApi } from 'openai'
function App() {
  const [messages, setMessages] = useState([]);
  const [isPresent, setIspresent] = useState(false)
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [openai, setOpenai] = useState(null);

  useEffect(() => {
    const initializeOpenAI = async () => {
      try {
        const configuration = new Configuration({
          apiKey: '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',
        });
        const openaiInstance = new OpenAIApi(configuration);
        setOpenai(openaiInstance);
      } catch (error) {
        console.error('Error initializing OpenAI:', error);
      }
    };

    initializeOpenAI();
  }, []);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;
    setMessages((prev) => setMessages([...prev, userMessage]))
    try {
      if (!openai || !openai.Completions.create) {
        console.error('OpenAI object or method not available');
        return;
      }
      // const prompt = chatHistory.map((item) => `User: ${item.text}`).join('\n');
      // const response = await openai.Completions.create({
      //   prompt: `${prompt}\nUser: ${userMessage}`,
      //   max_tokens: 50,
      // });
      const prompt = 'User: ' + userMessage;
      const response = await openai.Completions.create({
        model: 'davinci',
        prompt,
        max_tokens: 50,
      });
      console.log("response is", response)

      const newMessage = { text: userMessage, response: response.choices[0].text };
      setMessages((prev) => setMessages([...prev, userMessage]))
      console.log(userMessage)
      setChatHistory([...chatHistory, newMessage]);
      console.log(chatHistory)

      setIspresent(true)
      setUserMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div className="main-container">
      <div className="left-container">
        {isPresent ?
          <History messages={chatHistory} />
          :
          <div>no recent chat</div>
        }
        {chatHistory.map((message, index) => (
          <div key={index}>
            <div >User: {message.text}</div>
            <div >AI: {message.response}</div>
          </div>
        ))}

      </div>
      <div className="right-container">
        <div className="answer-field">

        </div>
        <div className="user-input">
          <input
            type="text"
            placeholder="Type your message..."
            className="inputbox"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />

          <button
            className="button-style"
            onClick={handleSendMessage}
          >Send</button>
        </div>



      </div>

    </div>
  );
}

export default App;
