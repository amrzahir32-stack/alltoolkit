import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({
  size = 46,
  showText = true,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div
        style={{
          width: size,
          height: size,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full drop-shadow-lg"
        >
          <defs>
            <linearGradient
              id="alltoolkit"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D6B48B" />
              <stop offset="100%" stopColor="#A7744D" />
            </linearGradient>
          </defs>

          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="22"
            fill="url(#alltoolkit)"
          />

          <path
            d="M35 30H65"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M50 30V70"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <circle
            cx="50"
            cy="50"
            r="8"
            fill="white"
          />
        </svg>
      </div>

      {showText && (
        <span className="text-2xl font-black tracking-tight text-[#2D241C]">
          AllToolkit
        </span>
      )}
    </Link>
  );
}