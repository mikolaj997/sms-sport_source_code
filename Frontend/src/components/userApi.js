import { useQuery, useMutation, useQueryClient, Mutation } from "@tanstack/react-query";

export const fetchData = async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); 
  };

  export const createUser = async (user) => {
    const response = await fetch("/api/user",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const data = await response.json();
      const error = new Error(data.error || "Request failed");
      error.code = data.code;
      throw error;
    }
    return response.json();
  };
  export const updateUser = async ({ username, user }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/username/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  };
  


//   export const createUserMutation = useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries("userData");
//     },
//   });
  
//   // const addUserIfNotExists = async (username, user) => {
//   //   try {
//   //     const userExists = await checkUserExists(username);
//   //     if (!userExists) {
//   //       createUserMutation.mutate(user);
//   //     } else {
//   //       console.log('User already exists');
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };
  
  
//   // useEffect(() => {
//   //     const handleAddUser = async () => {
//   //       const username = username; // replace with actual username
//   //       const user = { username, password:'' }; // replace with actual user data
//   //       await addUserIfNotExists(username, user);
//   //     };
      
//   //     handleAddUser();
//   // },[])
  
//   export const handleAddUser = async (username, sport) => {
       
//       const user = { Name: username, Location: "Gdynia",
//       Sport: sport}; // do dodsnia w przyszłości TransportType: selectedTransportType
//       await createUserMutation.mutate(user);
//     };
// export const queryClient = useQueryClient();
