import React from "react";

// components

export default function Logo({weight, short}) {
    return (
        <span className={`text-indigo-${weight + 100} hover:text-indigo-${weight - 100}`}>
        {!short && (
                <span className={`uppercase`}>cryp</span>
            )}<span className={`text-emerald-${weight} font-bold uppercase`}>trees</span>
        </span>
    )
}