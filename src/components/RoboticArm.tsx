import { useEffect, useState } from "react";

type Props = {
  className?: string;
  animate?: boolean;
};

export function RoboticArm({ className, animate = true }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let animId: number;
    const startTime = Date.now();
    const tick = () => {
      setTime((Date.now() - startTime) / 1000);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [animate]);

  // Oscillation ranges for smooth, premium arm cycles
  // Base rotation representation
  const baseRotation = animate ? 90 + 40 * Math.sin(time * 0.8) : 90;
  // Shoulder (15 to 165 degrees) - limited to nice active profiles
  const shoulderAngle = animate ? 65 + 35 * Math.sin(time * 1.0) : 65;
  // Elbow (15 to 165 degrees)
  const elbowAngle = animate ? 90 + 45 * Math.cos(time * 1.0) : 90;
  // Gripper claws open/closed (0% to 100%)
  const gripperClaws = animate ? 50 + 50 * Math.sin(time * 2.0) : 50;

  const radShoulder = (shoulderAngle * Math.PI) / 180;
  const globalForearmAngle = shoulderAngle + elbowAngle - 90;
  const radForearm = (globalForearmAngle * Math.PI) / 180;
  const radBase = ((radBaseAngle) => radBaseAngle)((baseRotation * Math.PI) / 180); // placeholder representation

  // Pivot coordinates matching original base dimensions
  const x0 = 200;
  const y0 = 285; // top surface of base

  const L1 = 95; // Link 1 length (Shoulder to Elbow)
  const L2 = 80; // Link 2 length (Elbow to Wrist)

  // Calculated Joint Positions (Trigonometric Forward Kinematics)
  const x1 = x0;
  const y1 = y0;
  const x2 = x1 + L1 * Math.cos(radShoulder);
  const y2 = y1 - L1 * Math.sin(radShoulder);
  const x3 = x2 + L2 * Math.cos(radForearm);
  const y3 = y2 - L2 * Math.sin(radForearm);

  // Claws opening/closing width math
  const gripperRatio = gripperClaws / 100;
  const clawOffset = 5 * gripperRatio;

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

      {/* Link 1 (Shoulder to Elbow) */}
      <g transform={`translate(${x1}, ${y1}) rotate(${-shoulderAngle})`}>
        <rect
          x={0}
          y={-10}
          width={L1}
          height={20}
          rx={8}
          fill="url(#armGrad)"
          filter="url(#softShadow)"
        />
      </g>

      {/* Link 2 (Elbow to Wrist) */}
      <g transform={`translate(${x2}, ${y2}) rotate(${-globalForearmAngle})`}>
        <rect
          x={0}
          y={-8}
          width={L2}
          height={16}
          rx={7}
          fill="url(#armGrad2)"
          filter="url(#softShadow)"
        />
      </g>

      {/* Wrist + Gripper Head */}
      <g transform={`translate(${x3}, ${y3}) rotate(${-globalForearmAngle})`}>
        <rect x={-8} y={-17} width={20} height={34} rx={6} fill="url(#armGrad)" />
        <circle cx={2} cy={0} r={5} fill="oklch(0.98 0 0)" />
        <circle cx={2} cy={0} r={2.5} fill="oklch(0.6 0.22 265)" />

        {/* Gripper fingers */}
        <rect
          x={12}
          y={-16 + clawOffset}
          width={14}
          height={6}
          rx={1.5}
          fill="oklch(0.3 0.03 260)"
        />
        <rect
          x={12}
          y={10 - clawOffset}
          width={14}
          height={6}
          rx={1.5}
          fill="oklch(0.3 0.03 260)"
        />
      </g>

      {/* Joint Center Caps (drawn on top of links to cover junctions) */}
      {/* Shoulder Joint */}
      <circle cx={x1} cy={y1} r={14} fill="oklch(0.2 0.03 260)" />
      <circle cx={x1} cy={y1} r={6} fill="oklch(0.72 0.18 265)" />

      {/* Elbow Joint */}
      <circle cx={x2} cy={y2} r={11} fill="oklch(0.2 0.03 260)" />
      <circle cx={x2} cy={y2} r={5} fill="oklch(0.72 0.18 190)" />

      {/* Blocks */}
      <g filter="url(#softShadow)">
        <rect x="80" y="310" width="24" height="24" rx="4" fill="oklch(0.65 0.22 25)" />
        <rect x="300" y="310" width="24" height="24" rx="4" fill="oklch(0.72 0.18 190)" />
        <rect x="330" y="310" width="24" height="24" rx="4" fill="oklch(0.75 0.2 130)" />
      </g>
    </svg>
  );
}
