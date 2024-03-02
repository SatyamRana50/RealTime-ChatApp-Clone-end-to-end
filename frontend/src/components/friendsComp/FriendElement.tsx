export function FriendsElement({ friends }: any) {
    return (
        <div className="w-full flex-grow overflow-y-auto px-2 flex flex-col justify-start ">
            {friends.map((friend: any, index: number) => (
                    <Friend key={index} friend={friend} />
                ))}
        </div>
    )
}
function Friend({friend}:any) {
    return (
        <div className="p-2 bg-white w-full flex justify-between items-center h-12 my-2 border border-slate-400 rounded-lg">
            <div className=" flex flex-start w-5/6">
            <div className="relative flex items-center w-10 h-10 justify-center overflow-hidden bg-purple-300 rounded-full">
    <span className="font-medium text-gray-600 dark:text-gray-300">S</span>
            </div>
            <div className="h-full  mx-12 ">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <h3 className="text-md font-bold text-gray-600">{friend.name}</h3>
                    <h3 className="text-xs text-gray-400">5+ new message</h3>
                </div>

            </div>
            </div>
            <div className="flex-grow h-full">
            <button type="button" className="flex justify-center items-center w-full h-full text-sm font-medium  focus:outline-none rounded-lg border border-gray-200 hover:bg-slate-800 focus:z-10 focus:ring-4 focus:ring-gray-100 bg-slate-700 text-white ">
               Chat
            </button>


            </div>

        </div>
    )

}