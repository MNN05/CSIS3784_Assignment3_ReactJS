import {useState} from "react";

        const EnterUsername = ({ roomCode, onSubmit }) => {
            const [username, setUsername] = useState('');

            const handleJoin = (role) => {
                if (username.trim()) {
                    onSubmit(username, role);
                }
            };

            return (
                <div className="relative z-10 bg-black p-8 md:p-12 rounded-lg border-2 border-orange-500 w-full max-w-lg shadow-[0_0_40px_#f97316,0_0_80px_#f59e0b] crt-monitor">
                <h1 className="text-4xl md:text-5xl text-center mb-4 tracking-widest text-orange-400 font-['Audiowide'] flicker-text" style={{ textShadow: '0 0 20px #FBBF24, 0 0 40px #F97316' }}>
                    Room Code: {roomCode}
                </h1>
                <h2 className="text-xl md:text-2xl text-center mb-8 text-white font-['Press Start 2P']">
                    ENTER DATA:
                </h2>
                <div className="flex flex-col gap-4 mb-8">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        className="w-full px-4 py-3 rounded-lg text-lg bg-black text-lime-400 placeholder-lime-700 border border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition-colors duration-300 shadow-inner shadow-lime-900"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    {/* The 'Join as Player' button now takes the user to the waiting lobby */}
                    <button
                        onClick={() => handleJoin('player')}
                        className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                        bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500
                        shadow-[0_0_20px_#3B82F6] hover:shadow-[0_0_40px_#22D3EE]
                        focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                         JOIN AS PLAYER
                    </button>
                    <button
                        onClick={() => handleJoin('spectator')}
                        className="w-full py-4 px-6 rounded-lg text-lg text-black font-bold tracking-widest uppercase transition-all duration-300
                        bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500
                        shadow-[0_0_20px_#E11D48] hover:shadow-[0_0_40px_#EC4899]
                        focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50"
                    >
                         JOIN AS SPECTATOR
                    </button>
                </div>
            </div>
        );
    };


export default JoinScreen;