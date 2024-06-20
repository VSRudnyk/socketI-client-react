import styles from './Home.module.css';

const Home = ({ socket, changeName, username, isUsernameSet }) => {
  const handleChange = (e) => {
    changeName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isUsernameSet(true);
    localStorage.setItem('username', username);
  };

  return (
    <div className={styles.homeWrapper}>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={handleChange}
          type='text'
          placeholder='Enter text here'
          autoComplete='off'
          autoFocus
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Home;
