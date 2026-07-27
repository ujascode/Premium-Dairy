/**
 * Charts.js - Centralized wrapper for Chart.js rendering
 */

const Charts = {
  getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      textColor: isDark ? '#94A3B8' : '#475569',
      gridColor: isDark ? '#1F2937' : '#E2E8F0',
      brand: '#3B82F6',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444'
    };
  },

  getCommonOptions() {
    const colors = this.getThemeColors();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: colors.textColor, font: { family: "'Inter', sans-serif" } }
        },
        tooltip: {
          backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1E293B' : '#FFFFFF',
          titleColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#F8FAFC' : '#0F172A',
          bodyColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#CBD5E1' : '#475569',
          borderColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#334155' : '#E2E8F0',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true
        }
      },
      scales: {
        x: {
          grid: { color: colors.gridColor, drawBorder: false },
          ticks: { color: colors.textColor, font: { family: "'Inter', sans-serif" } }
        },
        y: {
          grid: { color: colors.gridColor, drawBorder: false },
          ticks: { color: colors.textColor, font: { family: "'Inter', sans-serif" } },
          beginAtZero: true
        }
      }
    };
  },

  renderLineChart(ctxId, labels, data, labelName = 'Revenue', colorKey = 'brand') {
    const canvas = document.getElementById(ctxId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    const colors = this.getThemeColors();
    const color = colors[colorKey];
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${color}40`); // 25% opacity
    gradient.addColorStop(1, `${color}00`); // 0% opacity

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: labelName,
          data: data,
          borderColor: color,
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        }]
      },
      options: this.getCommonOptions()
    });
  },

  renderBarChart(ctxId, labels, data, labelName = 'Orders') {
    const canvas = document.getElementById(ctxId);
    if (!canvas) return null;
    
    const colors = this.getThemeColors();
    
    return new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: labelName,
          data: data,
          backgroundColor: colors.brand,
          borderRadius: 4,
          barThickness: 'flex',
          maxBarThickness: 32
        }]
      },
      options: this.getCommonOptions()
    });
  },
  
  renderDoughnutChart(ctxId, labels, data, colorsArray) {
    const canvas = document.getElementById(ctxId);
    if (!canvas) return null;
    
    const themeColors = this.getThemeColors();
    const bgColors = colorsArray || [themeColors.brand, themeColors.success, themeColors.warning, themeColors.danger, '#8B5CF6'];
    
    const opts = this.getCommonOptions();
    delete opts.scales; // No scales for doughnut
    opts.cutout = '75%';
    
    return new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: bgColors,
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: opts
    });
  }
};
