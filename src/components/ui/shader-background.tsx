"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { cn } from "@/lib/utils"

interface ShaderBackgroundProps {
  className?: string
  speed?: number
}

/**
 * Accent-lit animated background in the project palette
 * (black bean base, lime / green accent light).
 */
export function ShaderBackground({ className, speed = 0.6 }: ShaderBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden bg-white", className)}>
      <MeshGradient
        className="w-full h-full"
        colors={["#FFFFFF", "#D8F3DC", "#95D5B2", "#74C69D"]}
        speed={speed}
      />
      {/* fade to white so foreground text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.78)_70%,#FFFFFF_100%)]" />
    </div>
  )
}
