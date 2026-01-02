import React from "react";

const RPMAvatarCreator = ({ onAvatarCreated }) => {
  const handleMessage = (event) => {
    if (event.data?.source !== "readyplayerme") return;

    if (event.data.eventName === "v1.avatar.exported") {
      const avatarUrl = event.data.data.url;
      onAvatarCreated(avatarUrl);
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      src="https://ansuiya.readyplayer.me/avatar?frameApi"
      className="w-full h-[600px] rounded-xl border"
      allow="camera *; microphone *"
    />
  );
};

export default RPMAvatarCreator;
