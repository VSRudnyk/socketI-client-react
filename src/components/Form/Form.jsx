import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Form.module.css';
import sendIcon from './icon_send.svg';

const Form = ({ socket, chatArr, currentUser }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('sendMessageToUser', {
      userId: currentUser,
      message: value,
    });
    chatArr((previous) => [
      ...previous,
      { currentUser, message: value, id: uuidv4(), answerFrom: 'user' },
    ]);
    setValue('');
  };

  return (
    <div>
      <form className={styles.inputWraper} onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={handleChange}
          className={styles.input}
          type='text'
          placeholder='Enter text here'
          autoComplete='off'
          autoFocus
        />
        <button type='submit' className={styles.sendBtn}>
          <img src={sendIcon} alt='send icon' />
        </button>
      </form>
    </div>
  );
};

export default Form;

// import { useRef } from 'react';
// import styles from './Form.module.css';
// import sendIcon from './icon_send.svg';

// const Form = ({ onSubmit }) => {
//   const formData = useRef();

//   return (
//     <div>
//       <form className={styles.inputWraper}>
//         <input
//           ref={formData}
//           name='userInput'
//           className={styles.input}
//           type='text'
//           placeholder='Enter text here'
//           autoComplete='off'
//           autoFocus
//         />
//         <button
//           type='submit'
//           onClick={() => onSubmit(formData.current.value)}
//           className={styles.sendBtn}
//         >
//           <img src={sendIcon} alt='send icon' />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Form;
