const ChatPage = ({ user }) => {
  return (
    <main className="simple-page">
      <h1>Chat</h1>
      <p>Welcome, {user.username}.</p>
      <p>Socket events can be added here.</p>
    </main>
  );
};

export default ChatPage;
