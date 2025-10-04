import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';

export default function BackToOld() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('error', () => {
      const counter = parseInt(localStorage.getItem('unhandled-error-detected') || '0') + 1;
      localStorage.setItem('unhandled-error-detected', String(counter));

      if (counter % 3 !== 1) {
        return;
      }
      
      setIsOpen(true);
    });
    
    window.addEventListener('unhandledrejection', () => {
      const counter = parseInt(localStorage.getItem('unhandled-error-detected') || '0') + 1;
      localStorage.setItem('unhandled-error-detected', String(counter));

      if (counter % 3 !== 1) {
        return;
      }

      setIsOpen(true);
    });
  }, []);

  const onContinue = () => {
    setIsOpen(false);
  };

  const onOld = () => {
    localStorage.setItem('unhandled-error-detected', 'false');
    setIsOpen(false);
    location.href = 'https://v1.zdielaj.si';
  };

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onContinue}>
      <ModalContent>
        <ModalHeader>Unhandled error detected!</ModalHeader>
        <ModalBody>
          <p>This is a fresh version of the app, which is not yet stable and may contain bugs. The app already notified developers about this problem and it should be resolved in a short time.</p>
          <p className="italic">If you are experiencing an issue, you can still use the old version of the app.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="ghost" data-tracking-id="unhandled-error-modal-old" onPress={onOld}>
            Use old version
          </Button>
          <Button color="primary" data-tracking-id="unhandled-error-modal-continue" onPress={onContinue}>
            Continue with new version
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
