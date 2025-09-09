import React, { useEffect, useRef } from "react";

const VideoFeed = ({ playerId, username }) => {
  const videoRef = useRef();

  useEffect(() => {
    const handleStream = (e) => {
      if (videoRef.current) {
        videoRef.current.srcObject = e.detail;
      }
    };

    window.addEventListener(`stream-${playerId}`, handleStream);

    return () => {
      window.removeEventListener(`stream-${playerId}`, handleStream);
    };
  }, [playerId]);

  return (
    <div className="relative w-full h-48 bg-gray-900 border-4 border-fuchsia-400 rounded-lg overflow-hidden shadow-[0_0_20px_#FF00FF]">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <p className="absolute bottom-2 left-2 text-fuchsia-400 font-['Press Start 2P'] text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
        {username}
      </p>
    </div>
  );
};

export default VideoFeed;