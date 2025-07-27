// //components\SuccessPopup.js
// import { useEffect } from "react";
// // import successSound from "../../public/success.mp3"; // Ensure the sound file is in the public folder.

// const SuccessPopup = ({ message, duration = 3000, onClose }) => {
//   useEffect(() => {
//     // Play success sound
//     // const audio = new Audio(successSound);
//     // audio.play();

//     // Auto close after duration
//     const timer = setTimeout(() => {
//       onClose();
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration, onClose]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="animate-slide-up bg-green-100 text-black px-6 py-3 rounded-lg shadow-lg text-lg font-semibold">
//         {message} ✅
//       </div>
//     </div>
//   );
// };

// export default SuccessPopup;




// components/SuccessPopup.js
import { useEffect } from "react";

const SuccessPopup = ({ message = "Action completed successfully", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="animate-bounce bg-green-100 text-green-900 px-6 py-3 rounded-lg shadow-xl text-lg font-semibold border border-green-400">
        ✅ {message}
      </div>
    </div>
  );
};

export default SuccessPopup;
