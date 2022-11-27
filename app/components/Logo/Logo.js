import React from "react";

// components

export default function Logo({weight, short}) {
    return (
    <>
        {!short && (
                <span className={`text-indigo-${weight+100} uppercase`}>cryp</span>
            )}<span className={`text-amber-${weight} font-bold uppercase`}>trees</span>
    </>
    )
}