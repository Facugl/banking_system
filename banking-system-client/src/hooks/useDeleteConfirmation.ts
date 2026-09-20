import { useState } from 'react';
import { showSuccess, showError } from '../utils/toast';

interface UseDeleteConfirmationOptions<T> {
  deleteAction: (item: T) => Promise<unknown>;
  successMessage: string;
  errorMessage: string;
  getMessage?: (item: T) => string;
}

/**
 * Shared state machine for the "click delete -> confirm in a modal -> call
 * the delete thunk" flow repeated identically across the Roles, Modules,
 * Operations and Permissions views. Also tracks a real isLoading flag,
 * which those views previously hardcoded to `false` on ConfirmDeleteModal.
 */
export function useDeleteConfirmation<T>({
  deleteAction,
  successMessage,
  errorMessage,
  getMessage,
}: UseDeleteConfirmationOptions<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestDelete = (item: T) => {
    setItemToDelete(item);
    setIsOpen(true);
  };

  const cancelDelete = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    try {
      await deleteAction(itemToDelete);
      showSuccess(successMessage);
    } catch (error) {
      showError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setItemToDelete(null);
    }
  };

  return {
    isOpen,
    itemToDelete,
    message: itemToDelete && getMessage ? getMessage(itemToDelete) : undefined,
    isLoading,
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
