import React, { useState } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { SelectedSport } from "./SelectedSport";
import translations from "./translations";

const queryClient = new QueryClient();

const fetchMessages = async (selectedSport) => {
  const response = await fetch(
    `/api/messages${
      selectedSport === "Squash"
        ? `Squash`
        : selectedSport === "Table tennis, ping pong"
        ? `TableTenis`
        : selectedSport === "Paddleball, competitive"
        ? `Padel`
        : selectedSport === "Badminton"
        ? `Badminton`
        : selectedSport === "Running, general"
        ? `Running`
        : selectedSport === "Cycling, 12-13.9mph, moderate"
        ? `Biking`
        : selectedSport.includes("Tennis")
        ? `Tenis`
        : selectedSport
    }`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const sendMessage = async ({ newMessage, selectedSport }) => {
  const response = await fetch(
    `/api/messages${
      selectedSport === "Squash"
        ? `Squash`
        : selectedSport === "Table tennis, ping pong"
        ? `TableTenis`
        : selectedSport === "Paddleball, competitive"
        ? `Padel`
        : selectedSport === "Badminton"
        ? `Badminton`
        : selectedSport === "Running, general"
        ? `Running`
        : selectedSport === "Cycling, 12-13.9mph, moderate"
        ? `Biking`
        : selectedSport.includes("Tennis")
        ? `Tenis`
        : selectedSport
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return response.json();
};

const Chat = ({
  username,
  prefSport,
  selectedSport,
  setSelectedSport,
  tenisOptionsExtended,
  setTenisOptionsExtended,
  runningOptionsExtended,
  setRunningOptionsExtended,
  cyclingOptionsExtended,
  setCyclingOptionsExtended,
  language
}) => {
  const [newMessage, setNewMessage] = useState("");
  const date = new Date()

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", selectedSport],
    queryFn: () => fetchMessages(selectedSport),
  });

  const createMessageMutation = useMutation({
    mutationFn: (newMessage) => sendMessage({ newMessage, selectedSport, date }),

    onSuccess: () => {
      queryClient.invalidateQueries(["messages", selectedSport]);
    },
  });

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (selectedSport && newMessage) {
      try {
        await createMessageMutation.mutateAsync({
          User: username,
          Name: newMessage,
          Date: date
        });
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chat-container">
      <h1>{prefSport}</h1>
      <SelectedSport
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        tenisOptionsExtended={tenisOptionsExtended}
        setTenisOptionsExtended={setTenisOptionsExtended}
        runningOptionsExtended={runningOptionsExtended}
        setRunningOptionsExtended={setRunningOptionsExtended}
        cyclingOptionsExtended={cyclingOptionsExtended}
        setCyclingOptionsExtended={setCyclingOptionsExtended}
        language={language}
      />
      <div className="messages">
        <ul>
          {data &&
            data.map((message) => (
              <li key={message._id}>
                <span className="user">{`${message.User}: `}</span>
                {message.Name}
               <span className="date">{formatDate(message.Date)}</span> 
              </li>
            ))}
        </ul>
      </div>
      <form className="message-form" onSubmit={handleCreateMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

