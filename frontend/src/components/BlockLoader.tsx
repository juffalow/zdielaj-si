import styles from './BlockLoader.module.css';

const BlockLoader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.loader} {...props} />;
}

export default BlockLoader;
