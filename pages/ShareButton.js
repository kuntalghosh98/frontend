import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

const ShareButton = ({ product }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.href, // You can also use product.url if available
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide toast after 2 seconds
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faShareAlt}
        className="text-gray-600 cursor-pointer"
        onClick={handleShare}
      />
      {copied && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
