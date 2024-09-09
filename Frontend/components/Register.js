import { createUser } from "./userApi";
import { fetchData } from "./userApi";

function Register(){
        
const queryClient = useQueryClient();

const { data, isLoading, error } = useQuery({
  queryKey: "userData",
  queryFn: fetchData,
});

const createUserMutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries("userData");
  },
});

// const addUserIfNotExists = async (username, user) => {
//   try {
//     const userExists = await checkUserExists(username);
//     if (!userExists) {
//       createUserMutation.mutate(user);
//     } else {
//       console.log('User already exists');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };


// useEffect(() => {
//     const handleAddUser = async () => {
//       const username = username; // replace with actual username
//       const user = { username, password:'' }; // replace with actual user data
//       await addUserIfNotExists(username, user);
//     };
    
//     handleAddUser();
// },[])

const handleAddUser = async (username, sport) => {
     
    const user = { Name: username, Location: "Gdynia",
    Sport: sport}; // do dodsnia w przyszłości TransportType: selectedTransportType
    await createUserMutation.mutate(user);
  };
  return(<></>)
}