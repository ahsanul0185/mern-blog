import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { IoClose } from "react-icons/io5";

const Modal = ({ showModal, setShowModal, children }) => {

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);


  return createPortal(
    <motion.div
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{
        opacity: showModal ? 1 : 0,
        visibility: showModal ? "visible" : "hidden",
      }}
      onClick={() => setShowModal(false)}
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] grid place-items-center p-4"
    >
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-primaryDark border dark:text-gray-200 border-gray-300/40 rounded p-5 relative max-w-md w-full"
          >
            <button
              className="absolute top-3 right-3 text-2xl cursor-pointer hover:text-primaryDark dark:hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <IoClose />
            </button>
            <div className="mt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
