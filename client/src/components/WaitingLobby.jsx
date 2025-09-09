import React from "react";

const WaitingLobbyScreen = (roomCode, players, onStart) => {

            return (
                <div className="relative z-10 bg-black p-8 md:p-12 rounded-lg border-2 border-emerald-500 w-full max-w-lg shadow-[0_0_40px_#34d399,0_0_80px_#10b981] crt-monitor">
                    <h1 className="text-4xl md:text-5xl text-center mb-4 tracking-widest text-emerald-400 font-['Audiowide'] flicker-text" style={{ textShadow: '0 0 20px #10B981, 0 0 40px #34D399' }}>
                        WAITING LOBBY
                    </h1>

                    <h2 className="text-xl md:text-2xl text-center mb-2 text-white font-['Press Start 2P']">
                        ROOM CODE:
                    </h2>
                    <p className="text-center text-emerald-300 text-lg mb-6 font-mono tracking-widest">
                        {roomCode}
                    </p>


                    <h2 className="text-xl md:text-2xl text-center mb-8 text-white font-['Press Start 2P']">
                        PLAYERS:
                    </h2>
                    <ul className="list-none mb-8 space-y-3">
                        {players.map((player, index) => (
                            <li key={index} className="bg-gray-900 p-4 rounded-lg border-2 border-emerald-400 shadow-[0_0_15px_#10B981]">
                                <p className="text-lg text-emerald-300">
                                    {player.username} <span className="text-sm text-gray-400">({player.role})</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={onStart}
                        className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                        bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500
                        shadow-[0_0_20px_#A855F7] hover:shadow-[0_0_40px_#EC4899]
                        focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50"
                    >
                         START GAME
                    </button>
                </div>
            )};
export default WaitingLobbyScreen;