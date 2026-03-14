// themeToggle.js
import React, { useEffect, useState } from 'react';
import { THEME_ICONS } from '../../nodes/shared/icons';
import './themeToggle.css';

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark ? 'dark' : 'light';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {isDark ? THEME_ICONS.SUN : THEME_ICONS.MOON}
        </button>
    );
};