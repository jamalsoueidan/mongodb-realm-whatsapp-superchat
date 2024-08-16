import { ActionIcon, Modal, ModalProps } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useMobile } from "../hooks/useMobile";

export function CustomModal({
  children,
  back,
  ...props
}: ModalProps & { back?: () => void }) {
  const isMobile = useMobile();

  return (
    <Modal.Root size="xl" {...props} fullScreen={isMobile}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          {props.title ? <Modal.Title>Modal title</Modal.Title> : null}
          {back ? (
            <ActionIcon onClick={back} variant="transparent" color="#666">
              <IconArrowLeft stroke="1.5" />
            </ActionIcon>
          ) : null}
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
