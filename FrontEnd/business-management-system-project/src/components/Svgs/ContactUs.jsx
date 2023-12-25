/* eslint-disable react/prop-types */

const ContactUsSvg = ({ currentColor }) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 13V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.0799 18 6.2 18H16.2446C16.5263 18 16.6672 18 16.8052 18.0193C16.9277 18.0365 17.0484 18.065 17.1656 18.1044C17.2977 18.1488 17.4237 18.2118 17.6757 18.3378L21 20V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H13M8.12132 3.87868C9.29289 5.05025 9.29289 6.94975 8.12132 8.12132C6.94975 9.29289 5.05025 9.29289 3.87868 8.12132C2.70711 6.94975 2.70711 5.05025 3.87868 3.87868C5.05025 2.70711 6.94975 2.70711 8.12132 3.87868Z"
          stroke={currentColor}
          strokeWidth="1.8000000000000005"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
      </g>
    </svg>
  );
};

export default ContactUsSvg;