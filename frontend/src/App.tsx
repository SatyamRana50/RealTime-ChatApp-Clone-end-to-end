import Chat from "./components/chatComp";
import { FriendBar } from "./components/friendsComp";
export default function App() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 h-full">
        <FriendBar/>

      </div>
      <div className="w-2/3">
        <Chat/>
        </div>

    </div>
  )
}