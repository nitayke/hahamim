import { useDisclosure } from "@mantine/hooks";
import { Portal } from "@mantine/core";
import Loader from "~/Componenets/Loader/Loader";
import { atom, useAtom } from "jotai";

const loadingSpinnerState = atom(false);
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
export function useGlobalLoadingSpinner() {
  const [isOpen, setIsOpen] = useAtom(loadingSpinnerState);
  const LoadingSpinnerModal = () => (
    <>
      {isOpen && (
        <Portal>
          <Loader />
        </Portal>
      )}
    </>
  );
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return { LoadingSpinnerModal, open, close, toggle, opened: isOpen };
}
