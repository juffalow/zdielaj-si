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
      if (localStorage.getItem('unhandled-error-detected') === 'true') {
        return;
      }
      
      setIsOpen(true);
    });
    
    window.addEventListener('unhandledrejection', () => {
      if (localStorage.getItem('unhandled-error-detected') === 'true') {
        return;
      }

      setIsOpen(true);
    });
  }, []);

  const onContinue = () => {
    localStorage.setItem('unhandled-error-detected', 'true');
    setIsOpen(false);
  };

  const onOld = () => {
    localStorage.setItem('unhandled-error-detected', 'false');
    setIsOpen(false);
    location.href = 'https://v1.zdielaj.si';
  };

  return (
    <div>
      <Button onPress={() => setIsOpen(!isOpen)}>Open</Button>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={setIsOpen}>
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
    </div>
  );
};
