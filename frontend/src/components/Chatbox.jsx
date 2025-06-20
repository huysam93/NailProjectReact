import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../api/axiosConfig';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!message.trim()) return;
        setStatus('Sending...');
        try {
            await apiClient.post('/messages', { content: message });
            setMessage('');
            setStatus('Đã gửi!');
            setTimeout(() => setStatus(''), 2000);
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus('Lỗi. Thử lại.');
            setTimeout(() => setStatus(''), 2000);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[999]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChat}
                    className="bg-brand-pink-dark text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                    aria-label="Open chat"
                >
                    <MessageSquare size={24} />
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-[1000] overflow-hidden border border-gray-200"
                    >
                        <header className="bg-brand-pink-dark text-white p-3 flex justify-between items-center">
                            <h3 className="font-bold text-base">Chat với NanaNail</h3>
                            <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
                                <X size={20} />
                            </button>
                        </header>
                        <div className="p-4 h-40 flex flex-col justify-center items-center">
                             <p className="text-sm text-center text-gray-500">Vui lòng để lại số điện thoại / email / facebook... Chúng tôi sẽ trả lời bạn sớm nhất có thể!. ^^</p>
                             {status && <p className="text-xs text-center text-gray-500 mt-2 font-semibold">{status}</p>}
                        </div>
                        <div className="p-2 border-t border-gray-200 flex items-center bg-gray-50">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Nhập tin nhắn..."
                                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-pink-medium text-sm"
                            />
                            <button onClick={handleSend} className="bg-brand-pink-dark text-white p-3 rounded-r-md hover:bg-brand-pink-medium transition-colors" aria-label="Send message">
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbox;
