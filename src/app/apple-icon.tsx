import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#090D16",
        borderRadius: 36,
        padding: 24,
      }}
    >
      <svg
        width="132"
        height="132"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>VNTEZ IAM</title>
        <defs>
          <linearGradient
            id="vntez-fire"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f77241" />
            <stop offset="35%" stopColor="#fb291a" />
            <stop offset="70%" stopColor="#e3062a" />
            <stop offset="100%" stopColor="#b60343" />
          </linearGradient>
          <linearGradient
            id="vntez-accent"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff7a50" />
            <stop offset="100%" stopColor="#eb0c29" />
          </linearGradient>
        </defs>
        <path
          d="M 12 18 L 36 18 L 52 74 L 38 88 L 12 18 Z"
          fill="url(#vntez-fire)"
        />
        <path
          d="M 38 88 L 52 74 L 74 38 L 86 38 L 54 88 L 38 88 Z"
          fill="url(#vntez-fire)"
        />
        <path
          d="M 76 18 L 94 18 L 82 32 L 68 32 L 76 18 Z"
          fill="url(#vntez-accent)"
        />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
