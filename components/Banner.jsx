'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {

    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
      //   This will show a pop up
        toast.success('Coupon copied to clipboard!');
      //   Saving the code to clipboard
        navigator.clipboard.writeText('NEW20');
    };

    return isOpen && (
        <div className="w-full px-6 py-1 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
            {/* Creates parent div that is felx and centers the content in the y axes and justifies the content between */}
            <div className='flex items-center justify-between max-w-7xl  mx-auto'>
                <p>Get 20% OFF on Your First Order!</p>
                <div className="flex items-center space-x-6">
                        {/* This calls the handleClaim function after cliking the button which shows a pop up and saves the code to clipboard  */}
                    <button onClick={handleClaim} type="button" className="font-normal text-gray-800 bg-white px-7 py-2 rounded-full max-sm:hidden">Claim Offer</button>
                        {/* This button closes the banner */}
                    <button onClick={() => setIsOpen(false)} type="button" className="font-normal text-gray-800 py-2 rounded-full">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#fff" />
                            <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};