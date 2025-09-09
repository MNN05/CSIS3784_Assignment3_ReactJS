import React from 'react';


 const StartScreen = ({ onCreate, onJoin }) => (
            <div className="relative z-10 bg-black p-8 md:p-12 rounded-lg border-2 border-fuchsia-500 w-full max-w-lg shadow-[0_0_40px_#d946ef,0_0_80px_#6366f1] crt-monitor">
                <h1 className="text-4xl md:text-5xl text-center mb-4 tracking-widest text-fuchsia-400 font-['Audiowide'] flicker-text" style={{ textShadow: '0 0 20px #C084FC, 0 0 40px #818CF8' }}>
                    LASER TAG
                </h1>
                <h2 className="text-xl md:text-2xl text-center mb-8 text-yellow-400 font-['Press Start 2P']" style={{ textShadow: '0 0 10px #FFFF00, 0 0 20px #FFFF00' }}>
                    READY?
                </h2>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={onCreate}
                        className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                        bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500
                        shadow-[0_0_20px_#3B82F6] hover:shadow-[0_0_40px_#22D3EE]
                        focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                         CREATE GAME
                    </button>
                    <button
                        onClick={onJoin}
                        className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                        bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500
                        shadow-[0_0_20px_#E11D48] hover:shadow-[0_0_40px_#EC4899]
                        focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50"
                    >
                         JOIN GAME
                    </button>
                </div>
            </div>
        );


export default StartScreen;