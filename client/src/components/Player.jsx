import React, {useEffect, useRef} from "react";
import { socket } from "../socket";
import { request } from "express";

// Component for the Player Game UI
        const PlayerScreen = ({ username, roomCode }) => {
            const videoRef = useRef();
            const timer = "03:00";

            useEffect(() => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                    .then(stream => {
                        videoRef.current.srcObject = stream;
                        socket.emit('player-stream-started', { id: socket.id, username,roomCode });

                        socket.on('request-stream', ({requesterId}) => {
                            // Send the stream to the requester
                            const event = new CustomEvent(`stream-${requesterId}`, { detail: stream });
                            window.dispatchEvent(event);
                        }
                    )
                    });
                }, []);

            return (
                <div className="relative z-10 bg-black p-4 md:p-8 rounded-lg border-2 border-lime-500 w-full max-w-4xl shadow-[0_0_40px_#84cc16,0_0_80px_#65a30d] crt-monitor">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className="bg-gray-900 rounded-lg p-2 md:p-3 border border-pink-400 shadow-[0_0_20px_#EC4899]">
                            <h2 className="text-sm md:text-base text-pink-400 font-['Press Start 2P']">
                                USER: <span className="text-white">{username}</span>
                            </h2>
                            </div>
                        <div className="bg-gray-900 rounded-lg p-2 md:p-3 border border-pink-400 shadow-[0_0_20px_#EC4899]">
                            <h2 className="text-sm md:text-base text-pink-400 font-['Press Start 2P']">
                                CODE: <span className="text-white">{gameCode}</span>
                            </h2>
                        </div>
                    </div>

                    {/* Player's View / Video Feed Placeholder */}
                    <div className="relative w-full h-64 md:h-96 bg-gray-900 border-4 border-yellow-400 rounded-lg overflow-hidden mb-6 shadow-inner shadow-yellow-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-yellow-400 font-['Press Start 2P'] text-xl md:text-2xl animate-pulse">VIDEO FEED</p>
                            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        {/* Score Display */}
                        <div className="flex flex-col items-center bg-gray-900 rounded-lg p-3 md:p-4 border border-fuchsia-400 shadow-[0_0_20px_#c026d3]">
                            <p className="text-sm md:text-base text-gray-400 font-['Press Start 2P']">SCORE</p>
                            <p className="text-3xl md:text-4xl text-fuchsia-400 font-['Audiowide']" style={{ textShadow: '0 0 20px #C084FC' }}>{score}</p>
                        </div>
                        {/* Timer Display */}
                        <div className="flex flex-col items-center bg-gray-900 rounded-lg p-3 md:p-4 border border-lime-400 shadow-[0_0_20px_#84cc16]">
                            <p className="text-sm md:text-base text-gray-400 font-['Press Start 2P']">TIME</p>
                            <p className="text-3xl md:text-4xl text-lime-400 font-['Audiowide']" style={{ textShadow: '0 0 20px #84cc16' }}>{timer}</p>
                        </div>
                    </div>

                    {/* Progress Bar (Health/Energy) */}
                    <div className="w-full h-8 bg-gray-700 rounded-full mb-6 relative shadow-inner shadow-gray-900">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${health}%`, backgroundImage: 'linear-gradient(to right, #e11d48, #db2777, #9333ea, #6366f1)', boxShadow: '0 0 20px #a855f7, 0 0 40px #EC4899' }}>
                        </div>
                        <p className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-bold text-white font-['Press Start 2P']">
                            HEALTH: {health}%
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            className="flex-1 py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                            bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500
                            shadow-[0_0_20px_#3B82F6] hover:shadow-[0_0_40px_#22D3EE]
                            focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                             FIRE
                        </button>
                        <button
                            onClick={() => onScreenChange('initial')}
                            className="flex-1 py-4 px-6 rounded-lg text-lg text-white font-bold tracking-widest uppercase transition-all duration-300
                            bg-red-900 hover:bg-red-800
                            shadow-[0_0_20px_#FF0000] hover:shadow-[0_0_40px_#FF0000]
                            focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                        >
                             QUIT
                        </button>
                    </div>
                </div>
            );
        };

export default PlayerScreen;