import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function DeleteModal({ isOpen, onConfirm, onOpenChange, onClose }: { isOpen: boolean, onConfirm: () => void, onOpenChange: () => void, onClose: () => void }) {
  const { t } = useTranslation('', { keyPrefix: 'albums.deleteModal' });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{t('title')}</ModalHeader>
        <ModalBody>
          <p>{t('body')}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            {t('closeButton')}
          </Button>
          <Button color="danger" onPress={onConfirm}>
            {t('submitButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
