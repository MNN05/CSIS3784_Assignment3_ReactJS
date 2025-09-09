import React from 'react';

const InitialScreen = ({ onScreenChange }) => (
            <div className="relative z-10 bg-black p-8 md:p-12 rounded-lg border-2 border-violet-500 w-full max-w-lg shadow-[0_0_40px_#db2777,0_0_80px_#9333ea] crt-monitor">
                <h1 className="text-4xl md:text-5xl text-center mb-8 tracking-widest text-violet-400 font-['Audiowide'] flicker-text" style={{ textShadow: '0 0 20px #8B5CF6, 0 0 40px #EC4899' }}>
                    LASER TAG
                </h1>
                <button
                    onClick={() => onScreenChange('start')}
                    className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                    bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500
                    shadow-[0_0_20px_#A855F7] hover:shadow-[0_0_40px_#EC4899]
                    focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50"
                >
                     START GAME
                </button>
            </div>
        );


export default InitialScreen;