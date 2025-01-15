// global.d.ts
declare global {
  namespace NodeJS {
    interface Global {
      _log?: (...args: unknown[]) => void
      _getAnimationTimestamp?: () => number
      __sensorContainer?: Record<string, unknown>
      __frameTimestamp?: number
      __flushAnimationFrame?: (timestamp: number) => void
    }
  }
}

export {}
