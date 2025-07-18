'use client';

import { assets } from '../assets/assets';
import Image from 'next/image';
import React from 'react';
import {useUser, useClerk, UserButton} from '@clerk/nextjs'
import { useAppContext } from 'app/context/AppContext';
import ChatLabel from '../components/ChatLabel';

const Sidebar = ({ expand, setExpand }) => {

  const {openSignIn} =useClerk()
  const {user}=useAppContext()

  return (
    <div className={`flex flex-col justify-between bg-[#212337] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand ? 'p-4 w-64' : 'md:w-20 w-0'}`} >

      <div>
        <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
          <Image
            className={expand ? 'w-36' : 'w-10'}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=""
          />

          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image src={assets.menu_icon} alt="" className="md:hidden" />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt=""
              className="md:block w-7"
            />

            <div className={`absolute w-max ${expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none mt-1 z-50`}>
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'}`}
              ></div>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 flex items-center justify-center cursor-pointer relative ${expand
            ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
            : 'group h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg'
            }`}
        >
          {/* Chat icon */}
          <Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          />

          {/* Tooltip only when collapsed */}
          {!expand && (
            <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none z-50">
              New Chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
            </div>
          )}

          {/* "New Chat" label when expanded */}
          {expand && <p className="text-white text-sm font-medium">New Chat</p>}
        </button>

        <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
          <p className='my-1'>Recents</p>
          <ChatLabel/>

        </div>
      </div>

      <div>
        <div
          className={`flex items-center cursor-pointer group relative overflow-visible ${
            expand
              ? "gap-1 text-white/90 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            className={expand ? "w-5" : "w-6 mx-auto"}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt=""
          />

          <div
            className={`absolute -top-60 pb-8 ${
              !expand ? "-right-40" : "left-1/2 -translate-x-1/2"
            } hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50`}
          >
            <div className="relative w-max text-sm">
              <Image src={assets.qrcode} alt="" className="w-44" />
              <p className="text-white mt-1">Scan to get DeepSeek App</p>
            </div>
          </div>

          {expand && (
            <>
              <span>Get App</span>
              <Image alt="" src={assets.new_icon} />
            </>
          )}
        </div>

        <div onClick={ user ? null: openSignIn}
        className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full' } gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}>
          {
            user ? <UserButton/>
            :<Image src={assets.profile_icon} alt='' className='w-7'/>
          }
          
          {expand && <span>My PRofile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
