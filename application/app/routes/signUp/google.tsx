import{ useState } from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';
import { FaGoogle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../logger';

const GoogleSignUp = () => {
  const { t } = useTranslation("", { keyPrefix: "signIn.google" });
  const [ isLoading, setIsLoading ] = useState(false);

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
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          data-tracking-id="sign_up_google_button_click"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
          ) : (
            <FaGoogle className="h-5 w-5 text-red-500" />
          )}
          {t('signInButton')}
        </button>
      </div>

      <div className="relative mt-6 mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm/6">
          <span className="bg-white px-6 text-gray-500">{t("dividerText")}</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignUp;
