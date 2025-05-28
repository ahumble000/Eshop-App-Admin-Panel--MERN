import React, { useState, useEffect } from 'react';
import { socketService } from '../../services/socket';
import './MessageList.css';

const MessageList = () => {
    const [allMessages, setAllMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/messages');
            const data = await res.json();
            setAllMessages(data);
        } catch (e) {
            console.log('Error in fetching the data: ', e.message);
        }
    };

    useEffect(() => {
        fetchMessages();
   
        // Setup socket listeners for real-time updates
        socketService.onNewMessage((newMessage) => {
          setAllMessages(prev => [...prev, newMessage]);
        });

        socketService.onMessageRemoved((data) => {
          setAllMessages(prev => 
            prev.filter(message => message._id !== data.id)
          );
        });

        // Cleanup listeners on unmount
        return () => {
          socketService.removeAllListeners();
        };
    }, []);

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/messages/message/${messageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // No need to manually update state, socket will handle it
                console.log('Message deleted successfully');
            } else {
                console.log('Failed to delete the message');
            }
        } catch (e) {
            console.log('Error in deleting the message: ', e.message);
        }
    };

    return (
        <div className="product-list">
            <div className="message-list-headings product-list-headings">
                <h4>Name</h4>
                <h4>Email</h4>
                <h4>Message</h4>
                <h4>Date</h4>
                <h4>Delete</h4>
            </div>

            {allMessages.slice().reverse().map((message, i) => (
                <div key={i} className="message-list-items product-list-item">
                    <p>{message.name}</p>
                    <p>{message.email}</p>
                    <p>{message.message}</p>
                    <p>{new Date(message.date).toLocaleDateString()}</p>
                    <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default MessageList;