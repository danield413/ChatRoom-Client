import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { ConversationProvider } from "./contexts/ConversationProvider";
import './css/app.css'
import 'animate.css';

function App() {

  const [data, setData] = useState(null);

  return(
    <ConversationProvider id={data?.uid} name={data?.name}>
        {data !== null
        ? <Dashboard id={data?.uid} name={data?.name} idLogout={setData}/>
        : <Login idSubmit={setData}/>
        }
    </ConversationProvider>
  )
}

export default App;
