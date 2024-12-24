'use client'

export const TravelmaxLogo = ({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-10 h-10'
  }

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-white absolute transform translate-x-0.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M10 5c.7 1.2.7 3 0 4" />
          <path d="M14 5c.7 1.2.7 3 0 4" />
          <path d="M2 16h1c1.2 0 3-.4 4-2 1 1.6 2.8 2 4 2s3-.4 4-2c1 1.6 2.8 2 4 2h1" />
          <path d="M4 11c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-4 h-4 text-white/50 absolute bottom-0.5 right-0.5 transform rotate-45"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
          <line x1="16" y1="8" x2="2" y2="22" />
          <line x1="17.5" y1="15" x2="9" y2="15" />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text whitespace-nowrap">
          Travelmax
        </span>
      </div>
    </div>
  )
}
