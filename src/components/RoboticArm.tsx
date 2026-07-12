import { motion } from "framer-motion";

type Props = {
  className?: string;
  animate?: boolean;
};

// Stylized SVG robotic arm. Uses currentColor for base and CSS classes for accents.
export function RoboticArm({ className, animate = true }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 265)" />
          <stop offset="100%" stopColor="oklch(0.7 0.2 320)" />
        </linearGradient>
        <linearGradient id="armGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 190)" />
          <stop offset="100%" stopColor="oklch(0.6 0.22 265)" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Base */}
      <g filter="url(#softShadow)">
        <ellipse cx="200" cy="340" rx="110" ry="14" fill="oklch(0.55 0.02 260 / 0.25)" />
        <rect x="130" y="300" width="140" height="30" rx="10" fill="url(#armGrad2)" />
        <rect x="150" y="285" width="100" height="20" rx="6" fill="url(#armGrad)" />
      </g>

      {/* Lower arm - rotates */}
      <motion.g
        style={{ transformOrigin: "200px 290px" }}
        animate={animate ? { rotate: [-8, 12, -8] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect
          x="190"
          y="180"
          width="20"
          height="115"
          rx="8"
          fill="url(#armGrad)"
          filter="url(#softShadow)"
        />
        <circle cx="200" cy="290" r="14" fill="oklch(0.2 0.03 260)" />
        <circle cx="200" cy="290" r="6" fill="oklch(0.72 0.18 265)" />

        {/* Upper arm - independent rotation */}
        <motion.g
          style={{ transformOrigin: "200px 185px" }}
          animate={animate ? { rotate: [10, -20, 10] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="192"
            y="90"
            width="16"
            height="100"
            rx="7"
            fill="url(#armGrad2)"
            filter="url(#softShadow)"
          />
          <circle cx="200" cy="185" r="11" fill="oklch(0.2 0.03 260)" />
          <circle cx="200" cy="185" r="5" fill="oklch(0.72 0.18 190)" />

          {/* Head + gripper */}
          <motion.g
            style={{ transformOrigin: "200px 90px" }}
            animate={animate ? { rotate: [-5, 15, -5] } : undefined}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="178" y="70" width="44" height="34" rx="8" fill="url(#armGrad)" />
            <circle cx="200" cy="87" r="6" fill="oklch(0.98 0 0)" />
            <circle cx="200" cy="87" r="3" fill="oklch(0.6 0.22 265)" />
            {/* Gripper fingers */}
            <motion.rect
              x="180"
              y="104"
              width="6"
              height="20"
              rx="2"
              fill="oklch(0.3 0.03 260)"
              animate={animate ? { x: [180, 184, 180] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect
              x="214"
              y="104"
              width="6"
              height="20"
              rx="2"
              fill="oklch(0.3 0.03 260)"
              animate={animate ? { x: [214, 210, 214] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* Blocks */}
      <g filter="url(#softShadow)">
        <rect x="80" y="310" width="24" height="24" rx="4" fill="oklch(0.65 0.22 25)" />
        <rect x="300" y="310" width="24" height="24" rx="4" fill="oklch(0.72 0.18 190)" />
        <rect x="330" y="310" width="24" height="24" rx="4" fill="oklch(0.75 0.2 130)" />
      </g>
    </svg>
  );
}
