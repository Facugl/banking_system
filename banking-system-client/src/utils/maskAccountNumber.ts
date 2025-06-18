import { useState } from 'react';

export const maskAccountNumber = (
  accountNumber: string,
  showFull: boolean = false,
): string => {
  if (showFull) return accountNumber;

  const masked = '*'.repeat(accountNumber.length);

  return masked.match(/.{1,4}/g)?.join(' ') || masked;
};

export const useAccountNumberVisibility = () => {
  const [showFullNumber, setShowFullNumber] = useState(false);

  const toggleVisibility = () => {
    setShowFullNumber((prev) => !prev);
  };

  return { showFullNumber, toggleVisibility };
};
