import styles from './BlockLoader.module.css';

const BlockLoader = (props: any) => {
  return <div className={styles.loader} {...props} />;
}

export default BlockLoader;
