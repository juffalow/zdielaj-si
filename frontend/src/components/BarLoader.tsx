import styles from './BarLoader.module.css';

interface Props {
  children?: React.ReactNode;
  As?: React.ElementType;
}

const BarLoader: React.FC<Props> = ({ children, As = 'div' }: Props) => (
  <As className={styles.loader}>{children}</As>
);

export default BarLoader;
