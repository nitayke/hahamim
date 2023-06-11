import { useDisclosure } from "@mantine/hooks";
import { Portal } from "@mantine/core";
import Loader from "~/Componenets/Loader/Loader";

export default function useLoadingSpinner() {
  const [opened, { open, close, toggle }] = useDisclosure(false);

  const LoadingSpinnerModal = () => (
    <>
      {opened && (
        <Portal>
          <Loader />
        </Portal>
      )}
    </>
  );
  return { LoadingSpinnerModal, open, close, toggle, opened };
}
