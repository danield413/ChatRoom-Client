import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthProvider";
import './css/app.css'
import 'animate.css';

function App() {

  const [data, setData] = useState(null);

  return(
    <AuthProvider id={data?.uid} name={data?.name}>
        {data !== null
        ? <Dashboard id={data?.uid} name={data?.name} idLogout={setData}/>
        : <Login idSubmit={setData}/>
        }
    </AuthProvider>
  )
}

export default App;
