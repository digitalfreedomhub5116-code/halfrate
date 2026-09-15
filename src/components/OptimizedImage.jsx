import React, { useState, useEffect, useRef } from 'react'
import { Image as ImageIcon } from 'lucide-react'

/**
 * Reusable high-performance Image component for halfrate.co
 * - Smooth shimmer skeleton while downloading
 * - Seamless fade-in on load (no abrupt pops or layout shifts)
 * - Automatic pre-cache detection (no flicker if already in browser memory)
 * - Graceful fallback UI on broken/unreachable images
 * - Supports responsive aspect ratio, lazy/eager loading, and async decoding
 */
export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  priority = false,
  fallbackText = '',
  draggable = false,
  onClick,
  ...props
}) {
  const [status, setStatus] = useState('loading') // 'loading' | 'loaded' | 'error'
  const imgRef = useRef(null)

  // Check if image is already cached in browser memory on mount or src change
  useEffect(() => {
    setStatus('loading')
    if (!src) {
      setStatus('error')
      return
    }

    // Check if the image has already completed loading synchronously
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setStatus('loaded')
    }
  }, [src])

  const handleLoad = () => {
    setStatus('loaded')
  }

  const handleError = () => {
    setStatus('error')
  }

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      onClick={onClick}
    >
      {/* 1. Shimmer Skeleton Placeholder while loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-stone-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-200/90 to-stone-100 animate-pulse" />
          <div className="relative z-1 flex flex-col items-center gap-1.5 opacity-30">
            <ImageIcon className="h-6 w-6 text-stone-400" />
            <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
              halfrate
            </span>
          </div>
        </div>
      )}

      {/* 2. Fallback UI if image fails or 404s */}
      {status === 'error' && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#F7F4EE] p-4 text-center border border-stone-200">
          <div className="h-10 w-10 rounded-full bg-[#991B33]/10 flex items-center justify-center text-[#991B33] mb-1.5">
            <ImageIcon className="h-5 w-5" />
          </div>
          <p className="text-[11px] font-bold text-[#1C1917] line-clamp-1 max-w-[90%]">
            {fallbackText || alt || 'Product Preview'}
          </p>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#991B33] mt-0.5">
            Sabse Sasta
          </span>
        </div>
      )}

      {/* 3. The actual image element */}
      {src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          draggable={draggable}
          className={`transition-opacity duration-300 ease-out ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
