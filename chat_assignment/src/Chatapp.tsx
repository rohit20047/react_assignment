import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, VStack, Spinner, Avatar, Input, InputGroup, InputRightElement, IconButton, Button, HStack } from '@chakra-ui/react';
import { FaRegPaperPlane, FaPaperclip, FaCamera, FaVideo, FaFolderOpen } from 'react-icons/fa';
import axios from 'axios';
import formatDate from './convertDate';
import hasDateChanged from './dateChange';
import Header from './Header';

interface Message {
  id: string;
  message: string;
  time: number;
  sender: {
    self: boolean;
    image: string;
  };
}

function ChatApp(): JSX.Element {
  // State variables
  const [putDate, setPutDate] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element
  const [time, setTime] = useState<number>(0);
  const [isAttachmentOptionsVisible, setIsAttachmentOptionsVisible] = useState<boolean>(false);

  // Function to scroll to the bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Function to scroll to the top of messages
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch messages when page changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<{ chats: Message[] }>(`https://qa.corider.in/assignment/chat?page=${page}`);
        // Append new messages to the existing ones
        setMessages((prevMessages) => [...response.data.chats, ...prevMessages]);
        setIsLoading(false);
        // Scroll to bottom if it's the first page, otherwise scroll to top
        if (page === 0) {
          scrollToBottom();
        } else {
          scrollToTop();
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [page, scrollToTop, scrollToBottom]);

  // Automatically fetch new messages when scrolling to the top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop === 0 && messages.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [messages]);

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Handler for sending message
  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  // Update time every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Scroll to bottom when time changes
  useEffect(() => {
    if (time === 0) {
      scrollToBottom();
    }
  }, [messages, time]);

  // Handler for attachment icon click
  const handleAttachmentIconClick = () => {
    setIsAttachmentOptionsVisible(!isAttachmentOptionsVisible);
  };

  return (
    <>
      <Header />
      <VStack spacing={4} p={1}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              bg={message.sender.self ? 'blue.500' : 'gray.200'}
              color={message.sender.self ? 'white' : 'black'}
              p={4}
              borderRadius="md"
              shadow="md"
              display="flex"
              alignItems="center"
              alignSelf={message.sender.self ? 'flex-end' : 'flex-start'}
              maxW="80%"
            >
              {/* Display date if it has changed */}
           
              {/* Display sender's avatar if it's not self */}
              {!message.sender.self && <Avatar size="sm" src={message.sender.image} alt="User Image" />}
              {/* Display message */}
              <Text ml={2} mr={2} justifyContent="center" textAlign={message.sender.self ? 'right' : 'left'}>
                <span>{message.message}</span>
              </Text>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
        <InputGroup size="md" maxW="80%" position="sticky" bottom="0">
          <Input
            ref={inputRef}
            pr="4.5rem"
            placeholder="Type to @Rohit yadav ..."
            value={newMessage}
            onChange={handleInputChange}
            style={{ backgroundColor: "white" }}
          />
          <InputRightElement width="4.5rem">
            <IconButton icon={<FaPaperclip />} variant="ghost" colorScheme="gray" onClick={handleAttachmentIconClick} />
            <FaRegPaperPlane fontSize="1.5rem" cursor="pointer" onClick={handleSendMessage} />
          </InputRightElement>
          {/* Display attachment options if visible */}
          {isAttachmentOptionsVisible && (
            <VStack
              position="absolute"
              bottom="100%"
              left="0"
              right="0"
              m="auto"
              bg="white"
              borderRadius="md"
              boxShadow="md"
              w={{ base: "60%", md: "50%", lg: "70%" }} // Responsive width
              maxW="md"
              spacing={2}
            >
              <HStack spacing={1}>
                <Button leftIcon={<FaCamera className="responsive-icon" />} variant="ghost"></Button>
                <Button leftIcon={<FaVideo className="responsive-icon" />} variant="ghost"></Button>
                <Button leftIcon={<FaFolderOpen className="responsive-icon" />} variant="ghost"></Button>
              </HStack>
            </VStack>
          )}
        </InputGroup>
      </VStack>
    </>
  );
}

export default ChatApp;
