import {createContext} from 'react';

export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [signedIn, setSignedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{signedIn, setSignedIn}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
