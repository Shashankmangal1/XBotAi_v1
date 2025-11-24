import { Stack, Box } from '@mui/material';
import InitialChat from '../../components/InitialChat/InitialChat';
import ChatInput from '../../components/ChatInput/ChatInput';
import ChattingCard from '../../components/ChattingCard/ChattingCard';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json';
import { useOutletContext } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const listRef = useRef(null);
    const [chatId, setChatId] = useState(1);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [scrollToBottom, setScrollToBottom] = useState(false);

    const { chat, setChat, showMenu, setShowMenu } = useOutletContext(); 
    const { mode } = useContext(ThemeContext);

    // AI RESPONSE
    const generateResponse = (input) => {
        const response = data.find(item => input.toLowerCase() === item.question.toLowerCase());
        let answer = "Sorry, Did not understand your query!";

        if (response !== undefined) {
            answer = response.response;
        }

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
            minHeight={'100vh'}
            display={'flex'}
            sx={{
                '@media (max-width:767px)': {
                    background: mode === 'light'
                        ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)'
                        : ''
                }
            }}
        >

            <Navbar />

            {/* SIDEBAR + MAIN CONTENT */}
            <Stack direction="row" flex={1} overflow="hidden">

                {/* SIDEBAR */}
                <Box
                    sx={{
                        width: { xs: showMenu ? '70%' : 0, md: '260px' },
                        transition: '0.3s',
                        overflow: 'hidden',
                        borderRight: '1px solid #eee'
                    }}
                >
                    <Sidebar setChat={setChat} closeMenu={() => setShowMenu(false)} />
                </Box>

                {/* MAIN CHAT AREA */}
                <Stack flex={1}>

                    {/* INITIAL CHAT */}
                    {chat.length === 0 && (
                        <Stack
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            px={2}
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

                    {/* CHAT INPUT */}
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
