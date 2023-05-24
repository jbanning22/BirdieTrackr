<<<<<<< Updated upstream
import React, {createContext, useState} from 'react';
=======
import {createContext} from "react";
>>>>>>> Stashed changes

export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [signedIn, setSignedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{signedIn, setSignedIn}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
