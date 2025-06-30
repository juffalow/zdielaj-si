import styles from './BarLoader.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  As?: React.ElementType;
}

const BarLoader: React.FC<Props> = ({ children, As = 'div', ...props }: Props) => (
  <As className={styles.loader} {...props}>{children}</As>
);

export default BarLoader;
