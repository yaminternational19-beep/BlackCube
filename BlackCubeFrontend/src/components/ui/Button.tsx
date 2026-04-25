'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className,
  disabled,
  ...props 
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-glow';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-blue to-primary-blue/90 hover:from-primary-blue/90 hover:to-primary-purple text-white focus:ring-primary-blue shadow-lg shadow-primary-blue/30 hover:shadow-primary-blue/50',
    secondary: 'bg-gradient-to-r from-primary-purple to-primary-purple/90 hover:from-primary-purple/90 hover:to-primary-blue text-white focus:ring-primary-purple shadow-lg shadow-primary-purple/30 hover:shadow-primary-purple/50',
    outline: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue hover:border-primary-purple',
    ghost: 'text-primary-gray hover:text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
