
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatroom = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const chatRoom = '123_456'; // Replace with the actual chat room ID

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/getchatmessage?chat_room=${chatRoom}`);
            setChatMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('/sendmessage', {
                messanger: 'user_id1', // Replace with the actual sender ID
                chat_room: chatRoom,
                message: message,
            });
            setMessage('');
            fetchMessages(); // Refresh the messages after sending a new message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds (adjust as needed)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-900 text-white">
            <div className="w-1/3 p-4 border-r border-gray-700">
                <div className="font-bold text-lg mb-4">Chat List</div>
                {/* List of chat participants can go here */}
            </div>
            <div className="w-2/3 p-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md h-5/6">
                    <div className="chat-messages overflow-y-auto h-full">
                        {chatMessages.map((message, index) => (
                            <div key={index} className="mb-4">
                                <div className="bg-blue-500 text-white rounded-lg p-2">
                                    {message.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-4/5 p-2 rounded-lg border border-gray-300 text-black"
                    />
                    <button
                        onClick={sendMessage}
                        className="w-1/5 ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;
