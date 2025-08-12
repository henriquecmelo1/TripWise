import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
  animation?: 'pulse' | 'wave';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width = '100%',
  height = '1rem',
  className = '',
  lines = 1,
  animation = 'pulse'
}) => {
  const baseClasses = `bg-gray-300 dark:bg-gray-600 ${animation === 'pulse' ? 'animate-pulse' : 'skeleton'}`;
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-md';
      case 'card':
        return 'rounded-xl';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getStyle = () => ({
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  });

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} ${getVariantClasses()} p-6 ${className}`} style={getStyle()}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-400 dark:bg-gray-500 rounded w-1/2 animate-pulse" />
            </div>
          </div>
          
          {/* Content lines */}
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index}
                className={`h-3 bg-gray-400 dark:bg-gray-500 rounded animate-pulse`}
                style={{ width: `${100 - (index * 10)}%` }}
              />
            ))}
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <div className="h-8 bg-gray-400 dark:bg-gray-500 rounded w-20 animate-pulse" />
            <div className="h-8 bg-gray-400 dark:bg-gray-500 rounded w-16 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...getStyle(),
              width: index === lines - 1 ? '75%' : width, // Last line is shorter
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={getStyle()}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <SkeletonLoader variant="card" height="200px" className={className} />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <SkeletonLoader variant="text" lines={lines} className={className} />
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className = '' 
}) => (
  <SkeletonLoader 
    variant="circular" 
    width={size} 
    height={size} 
    className={className} 
  />
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <SkeletonLoader 
    variant="rectangular" 
    width="120px" 
    height="40px" 
    className={className} 
  />
);

export const SkeletonImage: React.FC<{ 
  width?: string | number; 
  height?: string | number; 
  className?: string; 
}> = ({ width = '100%', height = '200px', className = '' }) => (
  <SkeletonLoader 
    variant="rectangular" 
    width={width} 
    height={height} 
    className={className} 
  />
);

// Dashboard specific skeletons
export const SkeletonDashboardCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <SkeletonLoader variant="circular" width={48} height={48} />
      <SkeletonLoader variant="text" width={60} height={16} />
    </div>
    <SkeletonLoader variant="text" width={80} height={32} className="mb-2" />
    <SkeletonLoader variant="text" width={120} height={16} />
  </div>
);

export const SkeletonTripCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center space-x-4 p-4 ${className}`}>
    <SkeletonLoader variant="circular" width={48} height={48} />
    <div className="flex-1 space-y-2">
      <SkeletonLoader variant="text" width="60%" height={16} />
      <div className="flex space-x-4">
        <SkeletonLoader variant="text" width={80} height={14} />
        <SkeletonLoader variant="text" width={60} height={14} />
        <SkeletonLoader variant="text" width={70} height={14} />
      </div>
    </div>
    <SkeletonLoader variant="rectangular" width={80} height={24} />
  </div>
);

export default SkeletonLoader;