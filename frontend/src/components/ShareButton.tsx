import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './ShareButton.module.css'
import ShareImage from '../img/share.png';

interface Props {
  link: string;
}

const CustomToggle = React.forwardRef(({ onClick }: any, ref: any) => (
  <img
    src={ShareImage}
    ref={ref}
    alt="Share"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref: any) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled mb-0">
          {children}
        </ul>
      </div>
    );
  },
);

const ShareButton: React.FC<Props> = ({ link }: Props) => {
  const { t } = useTranslation();

  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(link);

    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  };

  return createPortal(
    <Dropdown className={styles.shareButton}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1" onClick={onCopyClick}>{t("components.shareButton.copyLink")}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  , document.getElementsByTagName('main')[0])
}

export default ShareButton;
