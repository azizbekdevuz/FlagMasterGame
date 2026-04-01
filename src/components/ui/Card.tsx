import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hoverEffect = false, glow = false, children, ...props }, ref) => {

        // Base using global CSS custom class "glass-panel" defined in globals.css
        const baseStyles = "glass-panel rounded-xl p-6 transition-all duration-300";

        // Conditional styles
        const hoverStyles = hoverEffect ? "hover:bg-surface-glassHover hover:border-brand-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/10 cursor-pointer" : "";

        // Glow effect (static)
        const glowStyles = glow ? "border-brand-500/50 shadow-[0_0_30px_rgba(14,165,233,0.15)]" : "";

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
