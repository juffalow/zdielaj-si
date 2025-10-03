import { createPortal } from 'react-dom';
import { Button } from '@heroui/react';
import type { PressEvent } from '@heroui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  link: string;
}

const MobileBottomButton = ({ link }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'album.userAlbum' });

  const onCopyClick = (event: PressEvent) => {
    navigator.clipboard.writeText(link);

    const innerHTML = (event.target as HTMLButtonElement).innerHTML;
    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = innerHTML;
    }, 2000);
  };

  return createPortal(
    <div className="relative">
      <div className="fixed w-full pt-4 pb-4 text-center" style={{ bottom: 0, backgroundColor: 'rgba(153, 153, 153, 0.6)', zIndex: 999 }}>
        <Button color="primary" onPress={onCopyClick} className="w-100" size="lg" data-tracking-id="album_mobile_button_copy_click">{t("mobileBottomButton")}</Button>
      </div>
    </div>
  , document.body);
}

export default MobileBottomButton;
