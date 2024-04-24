import { Modal } from "@/components/ui/modal";
import { useState, useEffect } from "react";

/**
 * ModalProvider renders a Modal component from "@/components/ui/modal".
 * It manages the mounting state of the component using the useState and useEffect hooks from React.
 * The Modal component is rendered only when the component is mounted.
 */

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal />
    </>
  );
};
