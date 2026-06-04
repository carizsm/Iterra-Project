"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DestinationType } from "../types";

type IllustrationSize = "sm" | "md" | "lg";

const sizeClass: Record<IllustrationSize, string> = {
  sm: "h-20 w-full sm:h-24",
  md: "h-28 w-full sm:h-36 lg:h-40 xl:h-44",
  lg: "h-32 w-full sm:h-40 lg:h-44 xl:h-48",
};

function AnimatedRoute({ d, delay = 0 }: { d: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#C86B4A"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="12 15"
      initial={reduceMotion ? undefined : { pathLength: 0.12, opacity: 0.5 }}
      animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
      transition={{
        duration: 4.4,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

function PulseDot({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="#C86B4A"
      animate={reduceMotion ? undefined : { scale: [1, 1.18, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FloatingGroup({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.g
      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 4.8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.g>
  );
}

export function TripTypeIllustration({
  type,
  size = "lg",
}: {
  type: string;
  size?: IllustrationSize;
}) {
  return (
    <svg viewBox="0 0 360 240" className={sizeClass[size]} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="360" height="240" rx="38" fill="#FBF8F1" />
      <circle cx="292" cy="54" r="24" fill="#E4B16F" opacity="0.75" />

      {type === "solo" ? (
        <>
          <path d="M0 184 C82 152 140 170 214 132 C274 102 316 112 360 82 V240 H0 Z" fill="#315846" opacity="0.13" />
          <FloatingGroup>
            <circle cx="148" cy="92" r="17" fill="#315846" />
            <path d="M134 114 h30 l15 62 h-62 z" fill="#315846" opacity="0.78" />
          </FloatingGroup>
          <AnimatedRoute d="M64 188 C112 142 174 206 246 138 C276 110 300 112 326 92" />
          <PulseDot cx={326} cy={92} />
        </>
      ) : type === "group" ? (
        <>
          <path d="M0 194 C86 166 146 184 222 146 C286 116 322 122 360 96 V240 H0 Z" fill="#315846" opacity="0.12" />
          {[104, 164, 224].map((x, index) => (
            <FloatingGroup key={x} delay={index * 0.35}>
              <circle cx={x} cy={92 + (index === 1 ? -10 : 0)} r="18" fill="#315846" opacity={index === 1 ? 0.95 : 0.68} />
              <path d={`M${x - 28} 160 C${x - 22} 122 ${x + 22} 122 ${x + 28} 160 Z`} fill="#315846" opacity={index === 1 ? 0.85 : 0.58} />
            </FloatingGroup>
          ))}
          <AnimatedRoute d="M78 182 C120 150 156 190 194 150 C226 118 252 132 286 100" />
          <PulseDot cx={286} cy={100} />
        </>
      ) : type === "hiking" ? (
        <>
          <path d="M44 190 L128 62 L204 190 Z" fill="#315846" opacity="0.72" />
          <path d="M154 190 L246 42 L326 190 Z" fill="#274638" opacity="0.9" />
          <path d="M242 50 L272 98 L220 98 Z" fill="#F8F3EA" opacity="0.7" />
          <AnimatedRoute d="M74 178 C112 134 144 154 180 112 C214 74 246 92 274 58" />
          <PulseDot cx={274} cy={58} />
        </>
      ) : type === "open_trip" ? (
        <>
          <rect x="78" y="62" width="204" height="124" rx="26" fill="#FFFFFF" stroke="#E5DED3" strokeWidth="3" />
          <path d="M116 92 H244" stroke="#315846" strokeWidth="8" strokeLinecap="round" opacity="0.2" />
          <path d="M116 124 H210" stroke="#315846" strokeWidth="8" strokeLinecap="round" opacity="0.16" />
          <path d="M186 86 v74" stroke="#315846" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
          <path d="M186 86 C214 68 232 96 260 80 v54 C232 150 214 122 186 140 Z" fill="#315846" opacity="0.82" />
          {[82, 108, 278, 306].map((x, index) => (
            <FloatingGroup key={x} delay={index * 0.25}>
              <circle cx={x} cy={162 - index * 15} r="8" fill="#C86B4A" opacity="0.85" />
            </FloatingGroup>
          ))}
          <AnimatedRoute d="M76 166 C122 116 156 178 196 128 C230 86 270 118 306 80" />
        </>
      ) : type === "city_trip" ? (
        <>
          <rect x="76" y="88" width="42" height="86" rx="7" fill="#315846" opacity="0.78" />
          <rect x="134" y="64" width="54" height="110" rx="8" fill="#274638" opacity="0.9" />
          <rect x="208" y="102" width="48" height="72" rx="7" fill="#315846" opacity="0.6" />
          {[94, 152, 170, 226].map((x, index) => (
            <motion.rect
              key={x}
              x={x}
              y={index % 2 ? 96 : 122}
              width="10"
              height="10"
              rx="2"
              fill="#FBF8F1"
              opacity="0.75"
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
            />
          ))}
          <AnimatedRoute d="M58 188 C110 142 168 206 226 150 C260 118 286 124 318 92" />
          <PulseDot cx={318} cy={92} />
        </>
      ) : (
        <>
          <circle cx="180" cy="124" r="70" fill="#315846" opacity="0.13" />
          <circle cx="180" cy="124" r="50" fill="none" stroke="#315846" strokeWidth="5" opacity="0.55" />
          <path d="M130 124 H230" stroke="#315846" strokeWidth="4" opacity="0.35" />
          <path d="M180 74 C158 104 158 146 180 174 C202 146 202 104 180 74 Z" fill="none" stroke="#315846" strokeWidth="4" opacity="0.38" />
          <AnimatedRoute d="M80 144 C124 62 214 194 282 82" />
          <PulseDot cx={282} cy={82} />
        </>
      )}
    </svg>
  );
}

export function DestinationIllustration({
  type,
  size = "lg",
}: {
  type: DestinationType;
  size?: IllustrationSize;
}) {
  return (
    <svg viewBox="0 0 360 240" className={sizeClass[size]} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="360" height="240" rx="38" fill="#FBF8F1" />
      <circle cx="292" cy="54" r="24" fill="#E4B16F" opacity="0.75" />
      {type === "beach" ? (
        <>
          <path d="M0 160 C70 128 124 184 192 150 C252 120 304 136 360 102 V240 H0 Z" fill="#315846" opacity="0.16" />
          <path d="M0 190 C86 150 140 202 216 166 C274 138 318 154 360 128 V240 H0 Z" fill="#C86B4A" opacity="0.18" />
        </>
      ) : type === "city" ? (
        <>
          <rect x="82" y="104" width="44" height="86" rx="7" fill="#315846" opacity="0.72" />
          <rect x="142" y="72" width="62" height="118" rx="9" fill="#274638" opacity="0.88" />
          <rect x="226" y="112" width="52" height="78" rx="7" fill="#315846" opacity="0.56" />
        </>
      ) : type === "countryside" ? (
        <>
          <path d="M0 170 C82 108 146 156 212 112 C270 74 312 94 360 58 V240 H0 Z" fill="#315846" opacity="0.14" />
          <path d="M0 198 C88 150 166 192 238 146 C292 112 326 130 360 104 V240 H0 Z" fill="#315846" opacity="0.23" />
        </>
      ) : type === "international" ? (
        <>
          <circle cx="180" cy="128" r="68" fill="#315846" opacity="0.14" />
          <circle cx="180" cy="128" r="48" fill="none" stroke="#315846" strokeWidth="5" opacity="0.55" />
        </>
      ) : type === "custom" ? (
        <>
          <rect x="86" y="70" width="188" height="126" rx="26" fill="#FFFFFF" stroke="#E5DED3" strokeWidth="3" />
          <path d="M118 112 H240" stroke="#315846" strokeWidth="8" strokeLinecap="round" opacity="0.18" />
          <path d="M118 146 H206" stroke="#315846" strokeWidth="8" strokeLinecap="round" opacity="0.14" />
        </>
      ) : (
        <>
          <path d="M56 190 L138 70 L204 190 Z" fill="#315846" opacity="0.7" />
          <path d="M172 190 L252 56 L322 190 Z" fill="#274638" opacity="0.88" />
        </>
      )}
      <AnimatedRoute d="M62 184 C126 104 204 212 290 88" />
      <PulseDot cx={290} cy={88} />
    </svg>
  );
}

export function DateRangeIllustration({ size = "lg" }: { size?: IllustrationSize }) {
  return (
    <svg viewBox="0 0 360 240" className={sizeClass[size]} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="360" height="240" rx="38" fill="#FBF8F1" />
      <motion.circle
        cx="294"
        cy="58"
        r="24"
        fill="#E4B16F"
        opacity="0.75"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="72" y="56" width="216" height="136" rx="26" fill="#FFFFFF" stroke="#E5DED3" strokeWidth="3" />
      <rect x="72" y="56" width="216" height="38" rx="18" fill="#315846" opacity="0.92" />
      {[112, 148, 184, 220, 256].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy="130"
          r="11"
          fill={index >= 1 && index <= 3 ? "#315846" : "#EFE7D8"}
          opacity={index >= 1 && index <= 3 ? 0.78 : 1}
          initial={{ scale: 0.8, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.12, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}
      <AnimatedRoute d="M112 164 C146 132 188 178 224 134 C244 112 260 116 278 98" />
      <PulseDot cx={278} cy={98} r={7} />
    </svg>
  );
}

export function MembersIllustration({ size = "lg" }: { size?: IllustrationSize }) {
  return (
    <svg viewBox="0 0 360 240" className={sizeClass[size]} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="360" height="240" rx="38" fill="#FBF8F1" />
      {[118, 180, 242].map((x, index) => (
        <FloatingGroup key={x} delay={index * 0.28}>
          <circle cx={x} cy={94 + (index === 1 ? -12 : 0)} r="22" fill="#315846" opacity={index === 1 ? 0.92 : 0.66} />
          <path d={`M${x - 36} 172 C${x - 28} 126 ${x + 28} 126 ${x + 36} 172 Z`} fill="#315846" opacity={index === 1 ? 0.86 : 0.55} />
        </FloatingGroup>
      ))}
      <AnimatedRoute d="M86 190 C132 140 194 210 252 146 C278 118 298 122 320 98" />
      <PulseDot cx={320} cy={98} />
    </svg>
  );
}

export function BudgetIllustration({
  size = "lg",
  group = false,
}: {
  size?: IllustrationSize;
  group?: boolean;
}) {
  return (
    <svg viewBox="0 0 360 240" className={sizeClass[size]} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="360" height="240" rx="38" fill="#FBF8F1" />
      <rect x="82" y="86" width="196" height="96" rx="26" fill="#315846" opacity="0.86" />
      <rect x="118" y="58" width="144" height="78" rx="22" fill="#FFFFFF" stroke="#E5DED3" strokeWidth="3" />
      {[136, 166, 196].map((x, index) => (
        <motion.rect
          key={x}
          x={x}
          y={118 - index * 12}
          width="18"
          height={42 + index * 12}
          rx="7"
          fill={index === 2 ? "#C86B4A" : "#EFE7D8"}
          initial={{ scaleY: 0.4, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: index * 0.18, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}
      {group ? (
        [244, 270, 296].map((x, index) => (
          <FloatingGroup key={x} delay={index * 0.2}>
            <circle cx={x} cy={70 + index * 16} r="7" fill="#315846" opacity="0.78" />
          </FloatingGroup>
        ))
      ) : (
        <circle cx="260" cy="128" r="15" fill="#C86B4A" />
      )}
      <AnimatedRoute d="M88 62 C132 26 202 78 268 40" />
    </svg>
  );
}
