import React from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types'; // Optional: For prop type validation

const StartButton = ({ text, path, className = '' }) => {
  const router = useRouter();

  const handleClick = () => {
    // Play the sound when the button is clicked
    const audio = new Audio('/sounds/startbutton.mp3');
    audio.play();

    // Use a small delay to allow the sound to play before navigating
    setTimeout(() => {
      if (path) {
        router.push(path);
      }
    }, 200); // 200ms delay to allow the sound to play before navigation
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative
        flex
        justify-center
        items-center
        rounded-md
        bg-button-bg
        font-montserrat
        shadow-button
        overflow-hidden
        cursor-pointer
        border-0
        group
        focus:outline-none
        ${className}
      `}
    >
      {/* Overlay Span simulating ::after */}
      <span
        className="
          absolute
          top-0
          left-auto
          right-0
          h-full
          bg-button-hover-bg
          transition-all
          duration-400
          ease-in-out
          w-0
          group-hover:w-full
          group-hover:left-0
          group-hover:right-auto
          z-10
        "
      ></span>

      {/* Button Text */}
      <span
        className="
          relative
          z-20
          text-center
          px-4
          py-2
          text-lg
          font-bold
          text-button-text
          tracking-widest
          transition-all
          duration-300
          ease-in-out
        "
      >
        {text}
      </span>

      {/* Hover Animation */}
      <style jsx>{`
        button:hover span:nth-child(2) {
          animation: scaleUp 0.3s ease-in-out;
          color: #ffffff;
        }

        @keyframes scaleUp {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </button>
  );
};

// Optional: Define PropTypes for better type checking
StartButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StartButton;
