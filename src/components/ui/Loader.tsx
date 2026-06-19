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
        sm: 50,
        md: 80,
        lg: 90
    };

    // Wrapper styles based on layout placement
    const wrapperClasses = fullScreen
        ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md'
        : 'flex items-center justify-center p-6';

    return (
        <div className='absolute inset-0 z-100'>
            <div role="status" aria-live="polite" className='w-full h-full flex items-center justify-center'>
                <div className="relative w-fit h-fit flex items-center justify-center">
                    <div className={`absolute rounded-full bg-indigo-500/10 animate-ping delay-150 
                        ${size === 'sm' ? 'w-20 h-20' : size === 'md' ? 'w-36 h-36' : 'w-40 h-40'}`}
                    />
                    <Loader2
                        size={iconSizes[size]}
                        className="animate-spin text-indigo-600 dark:text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;

