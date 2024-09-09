import React, { useState } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { SelectedSport } from "./SelectedSport";

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

// import React, { useState } from 'react';
// import { fetchData } from './userApi';
// import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
// import { SelectedSport } from './SelectedSport';

// const queryClient = new QueryClient();

// // const fetchMessages = async () => {
// //   const response = await fetch('/api/messages');

// //   if (!response.ok) {
// //     throw new Error('Failed to fetch messages');
// //   }
// //   return response.json();

// // };
// const fetchMessages = async (selectedSport) => {
//   const response = await fetch(`/api/messages${selectedSport === 'Squash' ? `Squash` : selectedSport === 'Table tennis, ping pong' ? `TableTenis` : selectedSport === 'Paddleball, competitive' ? `Padel` : selectedSport === 'Badminton' ? `Badminton` : selectedSport === 'Running, general' ? `Running` : selectedSport === 'Cycling, 12-13.9mph, moderate' ? `Biking` : selectedSport.includes('Tennis') ? `Tenis`: selectedSport}`); // Dynamiczny endpoint w zależności od sportu
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };
// const fetchBikeMessages = async () => {
//   const response = await fetch('/api/messagesBiking');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };
// const fetchWalkingMessages = async () => {
//   const response = await fetch('/api/messages');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };
// const fetchRunningMessages = async () => {
//   const response = await fetch('/api/messagesRunning');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };
// const fetchBadmintonMessages = async () => {
//   const response = await fetch('/api/messagesBadminton');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };
// const fetchTenisMessages = async () => {
//   const response = await fetch('/api/messagesTenis');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };
// const fetchSquashMessages = async () => {
//   const response = await fetch('/api/messages');

//   if (!response.ok) {
//     throw new Error('Failed to fetch messages');
//   }
//   return response.json();

// };

// const sendMessage = async (newMessage, selectedSport ) => {
//   const response = await fetch(`/api/messages${selectedSport === 'Squash' ? `Squash` : selectedSport === 'Table tennis, ping pong' ? `TableTenis` : selectedSport === 'Paddleball, competitive' ? `Padel` : selectedSport === 'Badminton' ? `Badminton` : selectedSport === 'Running, general' ? `Running` : selectedSport === 'Cycling, 12-13.9mph, moderate' ? `Biking` : selectedSport == 'Tennis, general' ? `Tenis`: ''}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newMessage),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to send message');
//   }
//   return response.json();

// };

// const Chat = ({username, prefSport,selectedSport, setSelectedSport, tenisOptionsExtended, setTenisOptionsExtended, runningOptionsExtended, setRunningOptionsExtended, cyclingOptionsExtended, setCyclingOptionsExtended}) => {
//   const [newMessage, setNewMessage] = useState('');

//   // const { data, isLoading, error } = useQuery({
//   //   queryKey: 'messages',
//   //   queryFn: fetchMessages,
//   //   enabled: selectedSport == ""
//   // });
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['messages', selectedSport],
//     queryFn: () => fetchMessages(selectedSport),
//     enabled: selectedSport == selectedSport
//     }
//   );
//   const { data1, isLoading1, error1 } = useQuery({
//     queryKey: 'messagesBadminton',
//     queryFn: fetchBadmintonMessages,
//     enabled: selectedSport == "Badminton"
//   });
//   // const { data2, isLoading2, error2 } = useQuery({
//   //   queryKey: 'messages',
//   //   queryFn: fetchTenisMessages,
//   //   enabled: selectedSport.includes('Tenis')
//   // });

//   const createMessageMutation = useMutation({
//     mutationFn: sendMessage,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['messages', selectedSport]);
//     },
//     enabled: selectedSport == 'Badminton'
//   });

//   const handleCreateMessage = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedSport && newMessage) {
//       await createMessageMutation.mutateAsync({ Name: newMessage, User: username });
//       }
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {}</div>;

//   return (
//     <div className="chat-container">
//     <h1>{prefSport}</h1>
//     <SelectedSport  selectedSport={selectedSport}
//               setSelectedSport={setSelectedSport}
//               tenisOptionsExtended={tenisOptionsExtended}
//               setTenisOptionsExtended={setTenisOptionsExtended}
//               runningOptionsExtended={runningOptionsExtended}
//               setRunningOptionsExtended={setRunningOptionsExtended}
//               cyclingOptionsExtended={cyclingOptionsExtended}
//               setCyclingOptionsExtended={setCyclingOptionsExtended}></SelectedSport>
//     <div className="messages">
//       <ul>
//         { data?data.map((message) => (
//           <li key={message._id}>
//             <span className="user">{`${message.User}: `}</span>
//             {message.Name}
//           </li>
//         )):''}
//         { data1 ?data1.map((message) => (
//           <li key={message._id}>
//             <span className="user">{`${message.User}: `}</span>
//             {message.Name}
//           </li>
//         )) :''}
//       </ul>
//     </div>
//     <form className="message-form" onSubmit={handleCreateMessage}>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="napisz wiadomość"
//       />
//       <button type="submit">wyślij</button>
//     </form>
//   </div>
//   );
// };

// export default Chat;
