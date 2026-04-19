"use client";
import React, { useEffect, useState } from 'react';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener("mousemove", handleMouseMove);

      
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

   
    return (
        <div
            className="fixed w-14 h-14 bg-gray-600/50 rounded-full pointer-events-none z-50 transition-all duration-200 ease-linear hidden md:block"
            style={{
                transform: `translate(${position.x - 24}px, ${position.y -24}px)`,
            }}
        >
        </div>
    );
}
