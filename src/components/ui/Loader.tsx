import React from 'react';
import { Loader2 } from 'lucide-react';

// Define the component's strict prop types
interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string | null;
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    text = 'Loading...',
    fullScreen = false
}) => {
    // Size mapping for text classes
    const textClasses: Record<'sm' | 'md' | 'lg', string> = {
        sm: 'text-sm mt-2',
        md: 'text-base mt-4',
        lg: 'text-lg mt-5'
    };

    // Spinner specific sizes for the Lucide SVG icon
    const iconSizes: Record<'sm' | 'md' | 'lg', number> = {
        sm: 20,
        md: 32,
        lg: 48
    };

    // Wrapper styles based on layout placement
    const wrapperClasses = fullScreen
        ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-md'
        : 'flex flex-col items-center justify-center p-6';

    return (
        <div className={wrapperClasses} role="status" aria-live="polite">
            <div className="relative flex items-center justify-center">
                {/* Outer glowing/pulsing ring */}
                <div className={`absolute rounded-full bg-indigo-500/10 animate-ping delay-150 
          ${size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-16 h-16' : 'w-24 h-24'}`}
                />

                {/* Main Spinner */}
                <Loader2
                    size={iconSizes[size]}
                    className="animate-spin text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                />
            </div>

            {/* Optional Loading Text */}
            {text && (
                <p className={`font-medium tracking-wide text-slate-600 dark:text-slate-300 animate-pulse ${textClasses[size]}`}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loader;