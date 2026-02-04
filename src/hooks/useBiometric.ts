import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export const useBiometricAuth = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsAvailable(hasHardware);
    setIsEnrolled(isEnrolled);
  };

  const authenticate = async () => {
    if (!isAvailable || !isEnrolled) {
      return false;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access iPractus',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
      });
      return result.success;
    } catch (error) {
      console.error('Biometric auth failed:', error);
      return false;
    }
  };

  return {
    isAvailable,
    isEnrolled,
    authenticate,
  };
};
