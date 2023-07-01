const FriendsInfo = ({
  currentFriend,
  typingHandler,
  showmessage,
  user,
  newMessage,
  activeUserFilter,
  scrollRef,
  handleMessageSubmit,
}) => {

  return (
    <>
      <div className="flex-none h-25 flex flex-row justify-between items-center p-5 border-b  ">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center justify-center space-x-2  ">
            {activeUserFilter.length > 0 ? (
              activeUserFilter?.map((singleActiveUser, index) => (
                <div className="p-2 " key={index}>
                  <img
                    className="w-10 h-10 rounded-full hover:bg-gray-100 md:mt-5 border border-green-600 "
                    src={singleActiveUser?.userInfo?.userPhoto}
                  />
                  <h1 className="flex-grow md:text-xl font-bold">
                    {singleActiveUser?.userInfo?.userName}
                  </h1>
                  <p className="text-green-500">online</p>
                </div>
              ))
            ) : (
              <div>
                <img
                  className="w-10 h-10 rounded-full hover:bg-gray-100 md:mt-5 "
                  src={currentFriend?.photoURL}
                />

                <h1 className="flex-grow md:text-xl font-bold">
                  {currentFriend?.name}
                </h1>
                <p>ofline</p>
              </div>
            )}
          </div>

          {/* <span className="text-[14px]  ">6 hour ago</span> */}
        </div>
        <div className="flex flex-row items-center"></div>
      </div>

      <div className="flex-auto overflow-y-auto p-5 space-y-4">
        {showmessage && showmessage.length > 0
          ? showmessage?.map((singlemessage, i) =>
            singlemessage?.senderEmail !== user?.email ? (
              <>
                <div className="flex flex-row space-x-2" key={i}>
                  <img
                    title={currentFriend?.displayName}
                    className="w-8 h-8 rounded-full"
                    src={currentFriend?.photoURL}
                  />

                  <div className="flex flex-col">
                    <div className="bg-gray-200 rounded p-5" ref={scrollRef}>
                      {singlemessage?.message}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-2 flex-row-reverse space-x-reverse">
                  <img
                    title={user?.displayName}
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL}
                  />

                  <div className="flex flex-col">
                    <div className="bg-blue-100 rounded p-5" ref={scrollRef}>
                      {singlemessage?.message}
                    </div>
                  </div>
                </div>
              </>
            )
          )
          : " "}
      </div>

      <div className="flex-none m-2">
        <form onSubmit={handleMessageSubmit}>
          <input
            //  value={newMessage}
            onChange={typingHandler}
            name="message"
            className="w-full outline-none border focus:border-blue-600 hover:border-blue-600 rounded-xl p-4 shadow-lg"
          />
        </form>
      </div>
    </>
  );
};
export default FriendsInfo;
