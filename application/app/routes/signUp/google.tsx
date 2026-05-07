import { useState } from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';
import { Button } from '@heroui/react';
import { FaGoogle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../logger';

const GoogleSignUp = () => {
  const { t } = useTranslation('', { keyPrefix: 'signIn.google' });
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      logger.debug('Initiating Google Sign In with redirect...');

      // Start the OAuth flow with Google
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      logger.error('Google Sign In failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div>
        <Button
          variant="tertiary"
          onClick={handleGoogleSignIn}
          isDisabled={isLoading}
          className="w-full"
          data-tracking-id="sign_up_google_button_click"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          ) : (
            <FaGoogle className="h-5 w-5 text-red-500" />
          )}
          {t('signInButton')}
        </Button>
      </div>

      <div className="relative mt-6 mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm/6">
          <span className="bg-background px-6 text-gray-500">{t('dividerText')}</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignUp;
