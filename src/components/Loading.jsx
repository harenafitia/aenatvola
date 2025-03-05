import React, { useState, useEffect } from 'react';

const Loading = ({
                     maxLoadingTime = 5000, // Default max loading time of 5 seconds
                     minLoadingTime = 3000, // Minimum time to show loading (5 seconds)
                     onLoadingComplete
                 }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeoutId;

        // Function to check if page is fully loaded
        const checkPageLoad = () => {
            // Check if all resources are loaded
            if (document.readyState === 'complete') {
                // Ensure minimum loading time
                timeoutId = setTimeout(() => {
                    setIsLoading(false);
                    if (onLoadingComplete) {
                        onLoadingComplete();
                    }
                }, minLoadingTime);
            } else {
                // If not fully loaded, check again in 100ms
                setTimeout(checkPageLoad, 100);
            }
        };

        // Fallback timeout to ensure loading disappears
        const maxTimeout = setTimeout(() => {
            setIsLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, maxLoadingTime);

        // Start checking page load
        checkPageLoad();

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(maxTimeout);
        };
    }, [maxLoadingTime, minLoadingTime, onLoadingComplete]);

    // If not loading, return null
    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-[#121212] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="flex flex-row gap-2 items-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
                    <div
                        className="w-4 h-4 rounded-full bg-red-500 animate-bounce"
                        style={{animationDelay: '-0.3s'}}
                    ></div>
                    <div
                        className="w-4 h-4 rounded-full bg-red-500 animate-bounce"
                        style={{animationDelay: '-0.5s'}}
                    ></div>
                </div>
                <span className="text-red-500 font-medium">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;