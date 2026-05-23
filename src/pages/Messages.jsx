import { useState, useRef, useEffect } from 'react';
import { Send, Search, ArrowLeft, MoreVertical } from 'lucide-react';
import { useApp } from '../context/AppContext';
import s from './Messages.module.css';

export default function Messages() {
  const { state, dispatch } = useApp();
  const [activeId, setActiveId] = useState(null);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const messagesEndRef = useRef(null);

  const convs = state.conversations.filter(c =>
    !query || c.name.toLowerCase().includes(query.toLowerCase())
  );
  const active = state.conversations.find(c => c.id === activeId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages]);

  const openConv = (id) => {
    setActiveId(id);
    dispatch({ type: 'MARK_READ', convId: id });
  };

  const sendMsg = () => {
    if (!text.trim() || !activeId) return;
    dispatch({ type: 'SEND_MESSAGE', convId: activeId, text: text.trim() });
    setText('');
  };

  return (
    <div className={s.page}>
      {/* Conversation list */}
      <div className={`${s.list} ${activeId ? s.listHidden : ''}`}>
        <div className={s.listHeader}>
          <h2 className={s.listTitle}>Xabarlar</h2>
        </div>
        <div className={s.searchBox}>
          <Search size={14} className={s.searchIco} />
          <input className={s.searchIn} placeholder="Qidirish..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className={s.convList}>
          {convs.map(c => (
            <button key={c.id} className={`${s.convItem} ${activeId===c.id?s.convActive:''}`} onClick={() => openConv(c.id)}>
              <div className={s.convAvatar} style={{background:c.color}}>
                <span style={{color:'#fff',fontSize:10,fontWeight:800}}>{c.avatar}</span>
              </div>
              <div className={s.convInfo}>
                <div className={s.convTop}>
                  <span className={s.convName}>{c.name}</span>
                  <span className={s.convTime}>{c.time}</span>
                </div>
                <div className={s.convBot}>
                  <span className={s.convLast}>{c.messages[c.messages.length-1]?.text}</span>
                  {c.unread > 0 && <span className={s.unreadDot}>{c.unread}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className={`${s.chat} ${!activeId ? s.chatHidden : ''}`}>
        {active ? (
          <>
            <div className={s.chatHeader}>
              <button className={s.backBtn} onClick={() => setActiveId(null)}><ArrowLeft size={18}/></button>
              <div className={s.chatAvatar} style={{background:active.color}}>
                <span style={{color:'#fff',fontSize:10,fontWeight:800}}>{active.avatar}</span>
              </div>
              <div className={s.chatInfo}>
                <span className={s.chatName}>{active.name}</span>
                <span className={s.chatRole}>{active.role}</span>
              </div>
              <button className={s.moreBtn}><MoreVertical size={18}/></button>
            </div>

            <div className={s.messages}>
              {active.messages.map(msg => (
                <div key={msg.id} className={`${s.bubble} ${msg.from==='me'?s.bubbleMe:s.bubbleThem}`}>
                  <span className={s.bubbleText}>{msg.text}</span>
                  <span className={s.bubbleTime}>{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className={s.inputRow}>
              <input
                className={s.msgInput}
                placeholder="Xabar yozing..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button className={`${s.sendBtn} ${text.trim()?s.sendActive:''}`} onClick={sendMsg}>
                <Send size={17}/>
              </button>
            </div>
          </>
        ) : (
          <div className={s.noChat}>
            <div className={s.noChatIcon}>💬</div>
            <h3>Suhbat tanlang</h3>
            <p>Chap tarafdan suhbat tanlang</p>
          </div>
        )}
      </div>
    </div>
  );
}
