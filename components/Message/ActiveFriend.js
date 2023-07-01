const ActiveFriend = ({ activefd, setCurrentFriend }) => {
  return (
    <div onClick={() => setCurrentFriend(
      {
        email: activefd.userInfo.userEmail, image: activefd.userInfo.userPhoto, userName: activefd.userInfo.userName
      })
    }>
      <img title={activefd.userInfo?.userName} style={{ border: "2px solid green" }} className="w-8 h-8 rounded-full " src={activefd?.userInfo?.userPhoto} />
    </div>
  );
};

export default ActiveFriend;