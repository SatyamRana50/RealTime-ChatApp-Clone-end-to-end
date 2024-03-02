import { FriendsElement } from "./FriendElement";
import { FriendsHeader } from "./FriendsHeader";

export function FriendBar(){
    return (
    <div className="flex flex-col h-full w-full">
    <div className="h-1/10 bg-slate-200">
      <FriendsHeader/>
    </div>
    
        <FriendsElement friends={[{name: "John Doe"}, {name: "Jane Doe"},
        {name: "John Doe"}, {name: "Jane Doe"},
        {name: "John Doe"}, {name: "Jane Doe"},
        {name: "John Doe"}, {name: "Jane Doe"},
        {name: "John Doe"}, {name: "Jane Doe"},
        {name: "John Doe"}, {name: "Jane Doe"},
    
    ]}/>
    
  </div>
    )
}