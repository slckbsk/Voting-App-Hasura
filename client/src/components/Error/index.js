import styles from "./styles.module.css";

function Error(message) {
  return (
    <div className={styles.loading}>
    Error: {message}
  </div>
  )
}

export default Error;