import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface Props {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export const ResourceModal = ({
  title,
  isOpen,
  handleClose,
  children,
}: Props) => {
  return (
    <Dialog.Root
      open={isOpen}
      onEscapeKeyDown={handleClose}
      onInteractOutside={handleClose}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={handleClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
