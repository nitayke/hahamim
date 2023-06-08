import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Portal } from "@mantine/core";

export default function useLoadingSpinner() {
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const LoadingSpinnerModal = () => (
    <>
      {opened && (
        <Portal>
          <div className="loader-container">
            <div className="loader" id="loader" hidden></div>
          </div>
          <div className="dark-screen" id="dark-screen" hidden></div>
        </Portal>
      )}
    </>
  );
  return { LoadingSpinnerModal, open, close, toggle, opened };
}
