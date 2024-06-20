import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import Form from '../Form/Form';
import styles from './Chat.module.css';

const Chat = ({ socket }) => {
  const [chatArr, setChatArr] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // socket.on('disconnect', () => {
  //   console.log('Disconnected from the server');
  // });

  useEffect(() => {
    const messageHandler = (data) => {
      const { message } = data;
      console.log('message from client', message);
      setChatArr((previous) => [
        ...previous,
        {
          currentUser,
          message,
          id: uuidv4(),
          answerFrom: 'operator',
        },
      ]);
    };

    const usersInChat = (users) => {
      for (let userId in users) {
        if (userId === 'operator') {
          return;
        } else {
          setUsersList((previous) => [...previous, userId]);
        }
      }
    };

    const connectUser = () => {
      console.log('Connected to the server');
      const userId = 'operator';
      socket.emit('register', userId);
    };

    socket.on('connect', connectUser);

    socket.on('message', messageHandler);
    socket.on('users', usersInChat);

    // Отписка от события при размонтировании компонента
    return () => {
      socket.off('message', messageHandler);
      socket.off('users', usersInChat);
      socket.off('connect', connectUser);
    };
  }, [currentUser, socket]);

  return (
    <div className={styles.chatWraper}>
      <div className={styles.sidebar}>
        <ul>
          {usersList.map((item) => (
            <li
              key={item}
              className={styles.userList}
              onClick={(e) => setCurrentUser(e.target.innerText)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatListWraper}>
        <h2 className={styles.chatTitle}>{currentUser}</h2>
        <ul className={styles.chatList}>
          {chatArr
            .filter((i) => i.currentUser === currentUser)
            .map((item) => (
              <li
                key={item.id}
                className={cn(styles.chatItem, {
                  [styles.user]: item.answerFrom === 'user',
                  [styles.operator]: item.answerFrom === 'operator',
                })}
              >
                {item.message}
              </li>
            ))}
        </ul>
      </div>
      <Form socket={socket} chatArr={setChatArr} currentUser={currentUser} />
      <div></div>
    </div>
  );
};

export default Chat;
