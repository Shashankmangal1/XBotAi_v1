import { Stack } from '@mui/material';
import InitialChat from '../../components/InitialChat/InitialChat';
import ChatInput from '../../components/ChatInput/ChatInput';
import ChattingCard from '../../components/ChattingCard/ChattingCard';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json';
import { useOutletContext } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const listRef = useRef(null);
    const [chatId, setChatId] = useState(1);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [scrollToBottom, setScrollToBottom] = useState(false);

    const { chat, setChat } = useOutletContext(); 
    const { mode } = useContext(ThemeContext);

    // AI RESPONSE
    const generateResponse = (input) => {
        const response = data.find(
            item => input.toLowerCase() === item.question.toLowerCase()
        );

        const answer = response?.response || "Sorry, Did not understand your query!";

        setChat(prev => ([
            ...prev,
            {
                type: 'Human',
                text: input,
                time: new Date(),
                id: chatId
            },
            {
                type: 'AI',
                text: answer,
                time: new Date(),
                id: chatId + 1
            }
        ]));

        setChatId(prev => prev + 2);
    };

    // AUTO SCROLL
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, [scrollToBottom]);

    return (
        <Stack
            minHeight="100vh"
            display="flex"
            sx={{
                pt: 0,
                mt: 0,
                '@media (max-width:767px)': {
                    background: mode === 'light'
                        ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)'
                        : ''
                }
            }}
        >

            <Navbar />

            {/* MAIN AREA (Sidebar already in App.js) */}
            <Stack 
                direction="row"
                flex={1}
                overflow="hidden"
                px={{ xs: 1, md: 3 }}
                pt={{ xs: 1, md: 2 }}
            >

                {/* MAIN CHAT COLUMN */}
                <Stack flex={1}>

                    {/* INITIAL LANDING VIEW */}
                    {chat.length === 0 && (
                        <Stack
                            flex={1}
                            justifyContent="flex-start"
                            alignItems="center"
                            mt={4}
                        >
                            <InitialChat generateResponse={generateResponse} />
                        </Stack>
                    )}

                    {/* CHAT LIST */}
                    {chat.length > 0 && (
                        <Stack
                            flex={1}
                            p={{ xs: 2, md: 3 }}
                            spacing={{ xs: 2, md: 3 }}
                            overflow="auto"
                            ref={listRef}
                            sx={{
                                '&::-webkit-scrollbar': { width: '10px' },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                                    borderRadius: '8px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(151, 133, 186,0.4)',
                                    borderRadius: '8px'
                                }
                            }}
                        >
                            {chat.map((item, index) => (
                                <ChattingCard
                                    details={item}
                                    key={index}
                                    updateChat={setChat}
                                    setSelectedChatId={setSelectedChatId}
                                    showFeedbackModal={() => setShowModal(true)}
                                />
                            ))}
                        </Stack>
                    )}

                    {/* CHAT INPUT BOX */}
                    <ChatInput
                        generateResponse={generateResponse}
                        setScroll={setScrollToBottom}
                        chat={chat}
                        clearChat={() => setChat([])}
                    />

                </Stack>
            </Stack>

            {/* FEEDBACK MODAL */}
            <FeedbackModal
                open={showModal}
                updateChat={setChat}
                chatId={selectedChatId}
                handleClose={() => setShowModal(false)}
            />

        </Stack>
    );
}
