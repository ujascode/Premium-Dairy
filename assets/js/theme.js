/**
 * Theme.js - Handles Dark Mode and UI theme toggling
 */

const Theme = {
  init() {
    const settings = Storage.getSettings();
    this.applyTheme(settings.theme);
  },
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    // Update theme icons if they exist in DOM
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'ph ph-sun text-xl' : 'ph ph-moon text-xl';
    }
    
    // Dispatch event so charts can re-render
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  },
  
  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    Storage.updateSettings({ theme: newTheme });
    this.applyTheme(newTheme);
  }
};
