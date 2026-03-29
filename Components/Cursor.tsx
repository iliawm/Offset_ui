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
            className="fixed w-24 h-24 bg-white/50 rounded-full pointer-events-none z-50"
            style={{
                transform: `translate(${position.x - 24}px, ${position.y -24}px)`,
            }}
        >
        </div>
    );
}
