
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ showModal, setShowModal, children }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const node = document.getElementById("modal-root");
    if (node) setModalRoot(node);
  }, []);

  useEffect(() => {
    if (showModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showModal]);

  if (!modalRoot || !showModal) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal && setShowModal(null)}
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] grid place-items-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-primaryDark border dark:text-gray-200 border-gray-300/40 rounded p-5 relative max-w-md w-full"
        >
          <button
            className="absolute top-3 right-3 text-2xl cursor-pointer hover:text-primaryDark dark:hover:text-white"
            onClick={() => setShowModal && setShowModal(null)}
          >
            <IoClose />
          </button>
          <div className="mt-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;



// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { AnimatePresence, motion } from "motion/react";
// import { IoClose } from "react-icons/io5";

// const Modal = ({ showModal, setShowModal, children }) => {

//   useEffect(() => {
//   if (showModal) {
//     const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//     document.body.style.overflow = "hidden";
//     document.body.style.paddingRight = `${scrollbarWidth}px`;
//   } else {
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
//   }

//   return () => {
//     document.body.style.overflow = "";
//     document.body.style.paddingRight = "";
//   };
// }, [showModal]);


//   return createPortal(
//   <AnimatePresence>
//     {showModal && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setShowModal(null)}
//         className="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] grid place-items-center p-4"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           // transition={{ type: "spring", stiffness: 360, damping: 30 }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white dark:bg-primaryDark border dark:text-gray-200 border-gray-300/40 rounded p-5 relative max-w-md w-full"
//         >
//           <button
//             className="absolute top-3 right-3 text-2xl cursor-pointer hover:text-primaryDark dark:hover:text-white"
//             onClick={() => setShowModal(null)}
//           >
//             <IoClose />
//           </button>
//           <div className="mt-5">{children}</div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>,
//   document.getElementById("modal-root")
// );


// };

// export default Modal;
