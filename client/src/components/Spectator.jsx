import React from "react";  
       
       // Component for the Spectator Game UI
        const SpectatorScreen = ({roomCode, players}) => {
            const timer = "03:00";
            

            return (
                <div className="relative z-10 bg-black p-4 md:p-8 rounded-lg border-2 border-violet-500 w-full max-w-6xl shadow-[0_0_40px_#9333ea,0_0_80px_#db2777] crt-monitor">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
                        <h1 className="text-2xl md:text-3xl text-center tracking-widest text-violet-400 font-['Audiowide'] mb-2 md:mb-0" style={{ textShadow: '0 0 20px #8B5CF6, 0 0 40px #A855F7' }}>
                            SPECTATOR VIEW
                        </h1>
                        <div className="flex gap-4">
                            <div className="bg-gray-900 rounded-lg p-2 md:p-3 border border-pink-400 shadow-[0_0_20px_#EC4899]">
                                <h2 className="text-sm md:text-base text-pink-400">
                                    CODE: <span className="text-white">{gameCode}</span>
                                </h2>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-2 md:p-3 border border-pink-400 shadow-[0_0_20px_#EC4899]">
                                <h2 className="text-sm md:text-base text-pink-400">
                                    TIME: <span className="text-white">{timer}</span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard Section */}
                    <div className="mb-8">
                        <h3 className="text-xl md:text-2xl text-cyan-400 font-['Press Start 2P'] mb-4">LEADERBOARD</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {players.map((player, index) => (
                                <div key={index} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center shadow-[0_0_20px_#00FFFF] border-2 border-cyan-400">
                                    <div>
                                        <p className="text-lg text-white">{player.name}</p>
                                        <p className="text-sm text-gray-400">SCORE: {player.score}</p>
                                    </div>
                                    <div className="h-6 w-16 rounded-full bg-gray-700 relative overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${player.health}%`, backgroundImage: 'linear-gradient(to right, #FF00FF, #00FFFF)' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Player Views Grid Section */}
                    <div>
                        <h3 className="text-xl md:text-2xl text-fuchsia-400 font-['Press Start 2P'] mb-4">LIVE FEEDS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {players.map((player, index) => (
                                <div key={index} className="relative w-full h-48 bg-gray-900 border-4 border-fuchsia-400 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_20px_#FF00FF]">
                                    <p className="text-fuchsia-400 font-['Press Start 2P'] text-lg animate-pulse">
                                        {player.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => onScreenChange('initial')}
                        className="w-full py-4 px-6 rounded-lg text-lg text-white font-bold tracking-widest uppercase transition-all duration-300 mt-8
                        bg-red-900 hover:bg-red-800
                        shadow-[0_0_20px_#FF0000] hover:shadow-[0_0_40px_#FF0000]
                        focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                    >
                         QUIT
                    </button>
                </div>
            );
        };

export default SpectatorScreen;