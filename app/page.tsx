
"use client"
import Image from "next/image";
import { Search, Plus, ChevronDown, Paperclip, Mic, Send, ChevronLeft, House } from 'lucide-react';
import { DiApple } from "react-icons/di";
import { BsPersonGear } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { BiCommentAdd } from "react-icons/bi";
import generateUsers from "./data";
import { useState, useEffect } from 'react';
import { formatTime, isToday, isYesterday } from './utils/dateUtil';

interface Message {
  text: string;
  timestamp: Date;
  sender: string;
  senderId: number;
}

interface User {
  id: number;
  name: string;
  image: string;
  message: string;
  timestamp: Date;
  username: string;
  bio: string;
  messages: Message[];
}

export default function Home() {
  const [todayMessages, setTodayMessages] = useState<User[]>([]);
  const [yesterdayMessages, setYesterdayMessages] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatListOpen, setChatListOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const generatedUsers = generateUsers().map(user => ({
      ...user,
      messages: user.messages.map(msg => ({
        ...msg,
        senderId: user.id
      }))
    }));

    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages, (key, value) => {
        if (key === 'timestamp') return new Date(value);
        return value;
      });

      const usersWithSavedMessages = generatedUsers.map(user => {
        const userMessages = parsedMessages[user.id] || [];
        return { ...user, messages: userMessages };
      });

      setTodayMessages(usersWithSavedMessages.filter(user => isToday(user.timestamp)));
      setYesterdayMessages(usersWithSavedMessages.filter(user => isYesterday(user.timestamp)));
      setSelectedUser(usersWithSavedMessages[0]);
    } else {
      setTodayMessages(generatedUsers.filter(user => isToday(user.timestamp)));
      setYesterdayMessages(generatedUsers.filter(user => isYesterday(user.timestamp)));
      setSelectedUser(generatedUsers[0]);
    }
  }, []);

  const sendMessage = () => {
    if (!selectedUser || !newMessage.trim()) return;

    const newMsg: Message = {
      text: newMessage.trim(),
      timestamp: new Date(),
      sender: 'You',
      senderId: 0
    };

    const updatedUser = {
      ...selectedUser,
      messages: [...selectedUser.messages, newMsg],
      message: newMessage.trim(), // Update the latest message preview
      timestamp: new Date() // Update the timestamp for sorting
    };

    const updateUsersList = (users: User[]) =>
      users.map(user => (user.id === selectedUser.id ? updatedUser : user));

    // Re-sort messages based on new timestamp
    const allUsers = [...todayMessages, ...yesterdayMessages];
    const updatedAllUsers = updateUsersList(allUsers);

    setTodayMessages(updatedAllUsers.filter(user => isToday(user.timestamp)));
    setYesterdayMessages(updatedAllUsers.filter(user => isYesterday(user.timestamp)));
    setSelectedUser(updatedUser);

    // Save to localStorage
    const savedMessages = localStorage.getItem('chatMessages');
    const allMessages = savedMessages ? JSON.parse(savedMessages) : {};
    allMessages[selectedUser.id] = updatedUser.messages;
    localStorage.setItem('chatMessages', JSON.stringify(allMessages));

    setNewMessage('');
  };

  const filteredTodayMessages = todayMessages.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredYesterdayMessages = yesterdayMessages.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="relative">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        quality={75}
        priority
      />
      <div className="absolute inset-0 bg-emerald-900/35 z-[1]"></div>

      <div className="relative z-10 flex h-screen overflow-hidden p-2 sm:p-6 gap-2 sm:gap-6 font-[family-name:var(--font-geist-sans)]">
        {/* Sidebar  */}
        <div className={`${isSidebarOpen ? 'flex' : 'hidden'} 
                   fixed md:relative w-[280px] h-full p-5 flex-col 
                   bg-white/5 rounded-3xl backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                   z-50 md:flex transition-all duration-300 ease-in-out`}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">KCHAT</h1>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-900/30 border border-white/20"
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <button className="w-full py-2 px-4 rounded-3xl bg-white/8 backdrop-blur-md border border-white/20 hover:bg-emerald-900/40 mb-8 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          <div className="mb-6">
            <h2 className="text-sm text-gray-300 mb-3 px-2">MAIN MENU</h2>
            <div className="space-y-1">
              <button className="w-full py-3 px-4 rounded-2xl hover:bg-emerald-900/30 flex items-center gap-3">
                <House className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button className="w-full py-3 px-4 rounded-2xl hover:bg-emerald-900/30 flex items-center gap-3">
                <BsPersonGear className="w-5 h-5" />
                <span>Invitation</span>
              </button>
              <button className="w-full py-2 px-4 rounded-3xl bg-white/10 backdrop-blur-md flex items-center gap-3 border border-white/20">
                <LuMessagesSquare className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>

          <div className="flex-grow"></div>

          <button className="w-full py-2 px-4 rounded-lg bg-white/7 backdrop-blur-[5px] border border-white/20 hover:bg-emerald-900/40 mb-4 flex items-center gap-3">
            <DiApple className="text-3xl" />
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on the</div>
              <div className="font-semibold">App Store</div>
            </div>
          </button>

          <div className="relative rounded-2xl p-5 mb-4 bg-white/7 backdrop-blur-[5px] border border-white/20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ffffff94] via-emerald-400/10 to-transparent"></div>
            <div className="relative">
              <h3 className="text-lg font-semibold mb-1">Go to Pro</h3>
              <p className="text-sm text-gray-300 mb-4">Try your experience for using more features</p>
              <button className="w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-emerald-950/70 transition-colors">
                <HiSparkles className="w-4 h-4 text-green-500" />
                <span>Upgrade Pro</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2 px-3 rounded-2xl hover:bg-emerald-900/30 cursor-pointer">
            <Image src="/user.jpg" alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-medium">Naimur Rahman</div>
            </div>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 flex h-full bg-white/5 backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-3xl">
          {/* Chat List Area */}
          <div className={`${isChatListOpen ? 'flex' : 'hidden'} 
            fixed md:relative w-full md:w-[40%] flex-col border-r border-white/15
            z-40 md:flex  h-full transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-5">
              <h2 className="text-xl font-semibold">Message</h2>
              <div className="flex gap-2">
                <button
                  className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-900/30 border border-white/20"
                  onClick={() => setChatListOpen(false)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20">
                  <BiCommentAdd className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-12 pr-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-gray-300 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 custom-scrollbar">
              {/* Today's Messages */}
              {filteredTodayMessages.length > 0 && (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                    <div className="text-center text-sm text-gray-300 bg-white/10 backdrop-blur-md py-1 px-4 rounded-full">Today</div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
                  </div>

                  {filteredTodayMessages.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-4 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-pointer mb-2 
                        ${selectedUser.id === user.id ? 'bg-emerald-900/30' : 'bg-white/5'}`}
                      onClick={() => {
                        setSelectedUser(user);
                        setChatListOpen(false);
                      }}
                    >
                      <Image src={user.image} alt={user.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-300 line-clamp-1">{user.message}</div>
                      </div>
                      <div className="text-xs text-gray-300">{formatTime(user.timestamp)}</div>
                    </div>
                  ))}
                </>
              )}

              {/* Yesterday's Messages */}
              {filteredYesterdayMessages.length > 0 && (
                <>
                  <div className="flex items-center justify-center my-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                    <div className="text-center text-sm text-gray-300 bg-white/10 backdrop-blur-md py-1 px-4 rounded-full">Yesterday</div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
                  </div>

                  {filteredYesterdayMessages.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-4 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-pointer mb-2 
                        ${selectedUser.id === user.id ? 'bg-emerald-900/30' : 'bg-white/5'}`}
                      onClick={() => {
                        setSelectedUser(user);
                        setChatListOpen(false);
                      }}
                    >
                      <Image src={user.image} alt={user.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-300 line-clamp-1">{user.message}</div>
                      </div>
                      <div className="text-xs text-gray-300">{formatTime(user.timestamp)}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Current Chat */}
          <div className={`flex-1 flex flex-col p-4 sm:p-6 ${!isChatListOpen ? 'w-full' : 'hidden md:flex'}`}>
            {/* Mobile Header */}
            <div className="flex md:hidden items-center gap-4 mb-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-900/30 border border-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setChatListOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-900/30 border border-white/20"
              >
                <LuMessagesSquare className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center">
              <Image src={selectedUser.image} alt={selectedUser.name} width={96} height={96} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h2 className="text-2xl font-semibold mb-2">{selectedUser.name}</h2>
              <p className="text-gray-300">{selectedUser.bio}</p>
              <div className="text-sm text-gray-400">By {selectedUser.username}</div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mt-8 custom-scrollbar">
              {selectedUser.messages.map((message: Message, index: number) => (
                <div key={index} className={`flex items-start gap-3 mb-4 ${message.senderId === 0 ? 'flex-row-reverse' : ''}`}>
                  <Image
                    src={message.senderId === 0 ? '/user.jpg' : selectedUser.image}
                    alt={message.senderId === 0 ? 'You' : selectedUser.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`flex-1 ${message.senderId === 0 ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-400">{message.senderId === 0 ? 'You' : selectedUser.username}</span>
                      <span className="text-sm text-gray-400 ml-auto">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className={`inline-block bg-white/5 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4 ${message.senderId === 0 ? 'bg-emerald-900/30' : ''
                      }`}>
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="mt-4">
              <div className="flex flex-col gap-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white transition duration-300 ease-in-out p-4">
                <textarea
                  placeholder="Type here..."
                  className="w-full bg-transparent focus:outline-none text-gray-100 text-lg resize-none"
                  rows={1}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="flex items-center gap-2 justify-between w-full pt-3">
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-300" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      <Mic className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                    onClick={sendMessage}
                  >
                    <Send className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}