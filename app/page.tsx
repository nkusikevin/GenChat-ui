"use client"
import Image from "next/image";
import { Search, Plus, ChevronDown, Paperclip, Mic, Send, ChevronLeft, House } from 'lucide-react';
import { DiApple } from "react-icons/di";
import { BsPersonGear } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { BiCommentAdd } from "react-icons/bi";

import { useState, useEffect } from 'react';


interface Message {
  text: string;
  timestamp: Date;
  sender: string;
}

interface User {
  id: number;
  name: string;
  image: string;
  message: string;
  timestamp: Date;
  username: string;
  bio: string;
  lastSeen: string;
  messages: Message[];
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
};

const generateUsers = () => {
  const now = new Date();
  return [
    {
      id: 1,
      name: 'Colleen',
      image: '/1.jpg',
      message: "Hey! Just finished that new game you recommended. It's absolutely amazing! 🎮",
      timestamp: now,
      username: '@colleen_gaming',
      bio: 'Professional Gamer & Streamer',
      lastSeen: 'Online',
      messages: [
        {
          text: "Just wrapped up an intense streaming session! The new update is incredible. Have you tried the new features yet?",
          timestamp: new Date(now.getTime() - 30 * 60 * 1000),
          sender: 'user'
        },

      ]
    },
    {
      id: 2,
      name: 'Max',
      image: '/2.jpg',
      message: "The project deadline is approaching. Can we schedule a quick review? 📊",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      username: '@max_tech',
      bio: 'Senior Software Developer',
      lastSeen: '2 hours ago',
      messages: [
        {
          text: "I've pushed the latest changes to the repository. The new authentication system is looking solid!",
          timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
          sender: 'user'
        },

      ]
    },
    {
      id: 3,
      name: 'Soham',
      image: '/3.jpg',
      message: "The designs for the new campaign are ready for review! 🎨",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      username: '@soham_designs',
      bio: 'Creative Director & UI/UX Designer',
      lastSeen: '4 hours ago',
      messages: [
        {
          text: "Just finished the mockups for the landing page. The new color scheme really pops!",
          timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
          sender: 'user'
        },

      ]
    },
    {
      id: 4,
      name: 'Kristin',
      image: '/4.jpg',
      message: "Meeting notes from today's client presentation are ready 📝",
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      username: '@kristin_pm',
      bio: 'Project Manager',
      lastSeen: '6 hours ago',
      messages: [
        {
          text: "Great presentation today! The client was really impressed with our progress.",
          timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
          sender: 'user'
        },

      ]
    },
    {
      id: 5,
      name: 'Eduardo',
      image: '/5.jpg',
      message: "New marketing analytics report is ready for review 📈",
      timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
      username: '@eduardo_marketing',
      bio: 'Marketing Analytics Lead',
      lastSeen: 'Yesterday',
      messages: [
        {
          text: "The latest campaign metrics are looking promising. Conversion rates are up by 25%!",
          timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          sender: 'user'
        },

      ]
    },
    {
      id: 6,
      name: 'Dianne',
      image: '/6.jpg',
      message: "Updated the user research findings with new insights 🔍",
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      username: '@dianne_ux',
      bio: 'UX Research Lead',
      lastSeen: 'Yesterday',
      messages: [
        {
          text: "The user testing sessions revealed some interesting patterns in navigation behavior.",
          timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000),
          sender: 'user'
        },

      ]
    }
  ];
};

export default function Home() {
  // const [users, setUsers] = useState<any[]>([]);
  const [todayMessages, setTodayMessages] = useState<User[]>([]);
  const [yesterdayMessages, setYesterdayMessages] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const generatedUsers = generateUsers();
    // setUsers(generatedUsers);
    setTodayMessages(generatedUsers.filter(user => isToday(user.timestamp)));
    setYesterdayMessages(generatedUsers.filter(user => isYesterday(user.timestamp)));
    setSelectedUser(generatedUsers[0]);
  }, []);

  if (!selectedUser) {
    return null; // Or a loading state
  }

  return (
    <div className="relative">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        quality={100}
      />
      <div className="relative z-10 flex h-screen overflow-hidden p-6 gap-6 font-[family-name:var(--font-geist-sans)]">
        {/* Sidebar */}
        <div className="w-80 h-full  p-5 flex flex-col 
          bg-white/5 rounded-3xl backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">KCHAT</h1>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-900/30 border border-white/20">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full py-2 px-4 rounded-3xl bg-white/7 backdrop-blur-[5px]border border-white/20  hover:bg-emerald-900/40 mb-8 flex items-center gap-2 ">
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          {/* Main Menu */}
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
              <button className="w-full  py-2 px-4 rounded-3xl bg-white/7 backdrop-blur-[5px] flex items-center gap-3 border border-white/20">
                <LuMessagesSquare className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>
          <div className="flex-grow"></div>

          {/* App Store Button */}
          <button className="w-full py-2 px-4 rounded-lg bg-white/7 backdrop-blur-[5px] border border-white/20 hover:bg-emerald-900/40 mb-4 flex items-center gap-3 ">
            <DiApple className="text-3xl" />
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on the</div>
              <div className="font-semibold">App Store</div>
            </div>
          </button>

          {/* Pro Features */}
          <div className=" rounded-2xl p-5 mb-4 bg-white/7 backdrop-blur-[5px] border border-white/20 text-center">
            <h3 className="text-lg font-semibold mb-1">Go to Pro</h3>
            <p className="text-sm text-gray-300 mb-4">Try your experience for using more features</p>
            <button
              className="
            w-full 
            py-2 
            px-4 
            rounded-lg 
            flex 
            items-center 
            justify-center 
            gap-2 
            border 
            border-white/20
            bg-white/10 
            backdrop-blur-md
            text-white
            hover:bg-emerald-950/70
            transition-colors
          "
            >
              <HiSparkles className="w-4 h-4 text-green-500" />
              <span>Upgrade Pro</span>
            </button>
          </div>


          {/* User Profile */}
          <div className=" flex items-center gap-3 py-2 px-3 rounded-2xl hover:bg-emerald-900/30 cursor-pointer">
            <Image src="/user.jpg" alt="User" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="font-medium">Naimur Rahman</div>
            </div>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 flex h-full bg-white/5  backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-3xl">
          {/* Chat Area (40%) */}
          <div className="w-[40%] flex flex-col border-r border-emerald-900/30">
            {/* Header */}
            <div className="flex items-center justify-between p-5 ">
              <h2 className="text-xl font-semibold">Message</h2>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-900/30 border border-white/20">
                <BiCommentAdd className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-5 ">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-12 pr-4 rounded-3xl 
                    bg-white/10 backdrop-blur-md 
                    border border-white/20 
                    shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30
                    text-white placeholder-gray-300
                    transition duration-300 ease-in-out"
                />
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto px-5 custom-scrollbar">
              {todayMessages.length > 0 && (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                    <div className="text-center text-sm text-gray-300 bg-white/10 backdrop-blur-md py-1 px-4 rounded-full">Today</div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
                  </div>

                  {todayMessages.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-pointer mb-2 ${selectedUser.id === user.id ? 'bg-emerald-900/30' : ''
                        }`}
                      onClick={() => setSelectedUser(user)}
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

              {yesterdayMessages.length > 0 && (
                <>

                  <div className="flex items-center justify-center my-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                    <div className="text-center text-sm text-gray-300 bg-white/10 backdrop-blur-md py-1 px-4 rounded-full">Yesterday</div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
                  </div>

                  {yesterdayMessages.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] cursor-pointer mb-2"
                      onClick={() => setSelectedUser(user)}
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

          {/* Current Chat (60%) */}
          <div className="flex-1 flex flex-col p-6">
            {/* Profile Info */}
            <div className="text-center">
              <Image src={selectedUser.image} alt={selectedUser.name} width={96} height={96} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h2 className="text-2xl font-semibold mb-2">{selectedUser.name}</h2>
              <p className="text-gray-300 mb-2">{selectedUser.bio}</p>
              <div className="text-sm text-gray-400">By {selectedUser.username}</div>
              <div className="text-sm text-gray-400 mt-1">{selectedUser.lastSeen}</div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mt-8 custom-scrollbar">
              {selectedUser.messages.map((message: Message, index: number) => (
                <div key={index} className="flex items-start gap-3 mb-4">
                  <Image src={selectedUser.image} alt={selectedUser.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{selectedUser.name}</span>
                      <span className="text-sm text-gray-400">{selectedUser.username}</span>
                      <span className="text-sm text-gray-400 ml-auto">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg backdrop-blur-[5px] border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-4">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="mt-4">
              <div className="flex flex-col gap-3 rounded-xl 
                    bg-white/10 backdrop-blur-md 
                    border border-white/20 
                    shadow-lg
                    text-white
                    transition duration-300 ease-in-out p-4">
                <textarea
                  placeholder="Type here..."
                  className="w-full bg-transparent focus:outline-none text-gray-100 text-lg resize-none"
                  rows={1}
                />

                <div className="flex items-center gap-2 justify-between w-full  pt-3">
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-300" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      <Mic className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full 
                    bg-white/10 backdrop-blur-md 
                    border border-white/20
                    hover:bg-white/20 transition-colors">
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