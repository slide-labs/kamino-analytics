import React from "react";

interface Props {
  className?: string;
}

const IconSearch: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M11.25 11.25L15.75 15.75M7.5 12.75C6.81056 12.75 6.12787 12.6142 5.49091 12.3504C4.85395 12.0865 4.2752 11.6998 3.78769 11.2123C3.30018 10.7248 2.91347 10.146 2.64963 9.50909C2.3858 8.87213 2.25 8.18944 2.25 7.5C2.25 6.81056 2.3858 6.12787 2.64963 5.49091C2.91347 4.85395 3.30018 4.2752 3.78769 3.78769C4.2752 3.30018 4.85395 2.91347 5.49091 2.64963C6.12787 2.3858 6.81056 2.25 7.5 2.25C8.89239 2.25 10.2277 2.80312 11.2123 3.78769C12.1969 4.77226 12.75 6.10761 12.75 7.5C12.75 8.89239 12.1969 10.2277 11.2123 11.2123C10.2277 12.1969 8.89239 12.75 7.5 12.75Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSearch;
