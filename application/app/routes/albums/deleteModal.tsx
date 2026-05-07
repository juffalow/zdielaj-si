import { useTranslation } from 'react-i18next';
import { Modal, Button } from '@heroui/react';

export default function DeleteModal({
  isOpen,
  onConfirm,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation('', { keyPrefix: 'albums.deleteModal' });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>{t('title')}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>{t('body')}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={onClose}>
                {t('closeButton')}
              </Button>
              <Button variant="danger" onPress={onConfirm}>
                {t('submitButton')}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
