const messages = [
  {
    id: 1,
    author: "Maya",
    text: "The socket UI is ready for an event stream.",
    time: "09:41",
    own: false,
  },
  {
    id: 2,
    author: "You",
    text: "I am wiring the real-time events next.",
    time: "09:42",
    own: true,
  },
];

const SocketPage = ({ user }) => {
  return (
    <main className="socket-page">
      <section className="socket-shell">
        <aside className="socket-sidebar">
          <div className="socket-brand">
            <span className="brand-mark">S</span>
            <div>
              <p className="eyebrow">Realtime workspace</p>
              <h1>Socket room</h1>
            </div>
          </div>

          <div className="room-label">
            <span>Rooms</span>
            <button type="button" aria-label="Add room" disabled>+</button>
          </div>
          <button className="room-button active" type="button">
            <span>#</span> general <strong>4</strong>
          </button>
          <button className="room-button" type="button">
            <span>#</span> build-log
          </button>
          <button className="room-button" type="button">
            <span>#</span> random
          </button>

          <div className="socket-profile">
            <span className="avatar">{user?.username?.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{user?.username}</strong>
              <small>Available</small>
            </div>
            <button type="button" aria-label="Open profile menu" disabled>...</button>
          </div>
        </aside>

        <section className="socket-conversation">
          <header className="conversation-header">
            <div>
              <p className="eyebrow">Channel</p>
              <h2># general</h2>
            </div>
            <div className="connection-controls">
              <span className="connection-dot offline" />
              <span>Socket UI</span>
            </div>
          </header>

          <div className="message-list">
            <div className="date-divider"><span>Today</span></div>
            {messages.map((message) => (
              <article className={`message ${message.own ? "message-own" : ""}`} key={message.id}>
                {!message.own && <span className="avatar avatar-small">{message.author.charAt(0)}</span>}
                <div className="message-content">
                  <div className="message-meta">
                    <strong>{message.author}</strong>
                    <time>{message.time}</time>
                  </div>
                  <p>{message.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="composer">
            <input
              placeholder="Write a message..."
              aria-label="Message"
              disabled
            />
            <button type="button" aria-label="Send message" disabled>Send</button>
          </div>
          <p className="socket-hint">UI only</p>
        </section>
      </section>
    </main>
  );
};

export default SocketPage;