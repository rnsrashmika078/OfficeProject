import { useState, useEffect } from 'react';
import './Banner.css'; // Optional CSS for styling

const BannerNotice = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if the banner has already been dismissed
        const bannerDismissed = localStorage.getItem('bannerDismissed');
        if (!bannerDismissed) {
            setShowBanner(true); // Show the banner if it hasn't been dismissed
        }
    }, []);

    const handleDismiss = () => {
        setShowBanner(false); // Hide the banner
        localStorage.setItem('bannerDismissed', 'true'); // Mark the banner as dismissed
    };

    if (!showBanner) {
        return null; // Don't render the banner if it's not supposed to be shown
    }

    return (
        <div className="banner-notice">
            <p>Welcome to our website! Here is an important notice.</p>
            <button onClick={handleDismiss} className="banner-dismiss-btn">
                Dismiss
            </button>
        </div>
    );
};

export default BannerNotice;
