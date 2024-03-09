import './App.css'
import ChatApp from './Chatapp'
import { ChakraProvider } from '@chakra-ui/react'
export default function App() {
  return (
    <ChakraProvider>
      <ChatApp />
    </ChakraProvider>
   
  )
}