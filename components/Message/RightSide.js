
const RightSide = ({ friend, setCurrentFriend, currentFriend }) => {


  return (
    <>
      <div className="border-l-2 border-transparent space-y-4">

        <div
          onClick={() => setCurrentFriend(friend)}
          className="flex flex-row p-2 items-center space-x-2  hover:bg-gray-100 "
        >
          <img
            className={currentFriend.id === friend.id ? 'border border-green-500 w-10 h-10 rounded-full  border-xl ' : 'w-10 h-10 rounded-full border border-xl'}
            src={friend.photoURL}
          />
          <strong className="flex-grow text-sm">
            {friend?.name}
          </strong>
          <div className="text-sm text-gray-600">4hr</div>
        </div>


        <div className="flex flex-row items-center space-x-1"></div>
      </div>
    </>
  );
};

export default RightSide;