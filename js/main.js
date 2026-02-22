/* ============================================
   TOOLZY - Main JavaScript
   Vanilla JS functionality
   ============================================ */

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const toolCards = document.querySelectorAll('.tool-card');
  
  if (!searchInput || toolCards.length === 0) return;
  
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    toolCards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
      const searchableText = title + ' ' + description;
      
      if (searchableText.includes(searchTerm)) {
        card.parentElement.style.display = '';
      } else {
        card.parentElement.style.display = 'none';
      }
    });
    
    // Show "no results" message if needed
    const visibleCards = Array.from(toolCards).filter(card => 
      card.parentElement.style.display !== 'none'
    );
    
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (visibleCards.length === 0 && searchTerm !== '') {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'result-empty';
        noResultsMsg.style.gridColumn = '1 / -1';
        noResultsMsg.textContent = 'No tools found matching your search.';
        document.querySelector('.grid').appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  });
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', initializeSearch);

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ============================================

function copyToClipboard(text, button) {
  if (!text) {
    showNotification('Nothing to copy!', 'error');
    return;
  }
  
  // Use modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        handleCopySuccess(button);
      })
      .catch(() => {
        fallbackCopy(text, button);
      });
  } else {
    fallbackCopy(text, button);
  }
}

function fallbackCopy(text, button) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    handleCopySuccess(button);
  } catch (err) {
    showNotification('Failed to copy', 'error');
  }
  
  document.body.removeChild(textarea);
}

function handleCopySuccess(button) {
  const originalText = button.textContent;
  button.classList.add('copied');
  button.textContent = '✓ Copied!';
  
  setTimeout(() => {
    button.classList.remove('copied');
    button.textContent = originalText;
  }, 2000);
}

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================

function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const content = this.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
        const accContent = accItem.querySelector('.accordion-content');
        if (accContent) {
          accContent.style.maxHeight = null;
        }
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Initialize accordions on page load
document.addEventListener('DOMContentLoaded', initializeAccordions);

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
  // Remove existing notification if any
  const existing = document.querySelector('.notification-toast');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification-toast notification-${type}`;
  notification.textContent = message;
  
  // Add styles inline for toast notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: '10000',
    fontWeight: '500',
    fontSize: '0.875rem',
    animation: 'slideInUp 0.3s ease',
    maxWidth: '400px'
  });
  
  // Set color based on type
  if (type === 'success') {
    notification.style.background = '#10b981';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.background = '#ef4444';
    notification.style.color = 'white';
  } else {
    notification.style.background = '#2563eb';
    notification.style.color = 'white';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// FORM VALIDATION
// ============================================

function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'var(--color-error)';
    } else {
      input.style.borderColor = 'var(--color-border)';
    }
  });
  
  return isValid;
}

// ============================================
// LOADING STATE
// ============================================

function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = '<div class="loading-spinner loading-spinner-lg"></div>';
  
  element.style.position = 'relative';
  element.appendChild(overlay);
}

function hideLoading(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const overlay = element.querySelector('.loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath !== '/' && currentPath.includes(link.getAttribute('href')))) {
      link.style.color = 'var(--color-primary)';
    }
  });
  
  // Highlight active category button
  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    const href = button.getAttribute('href');
    if (currentPath.includes(href)) {
      button.classList.add('active');
    }
  });
});

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================

window.copyToClipboard = copyToClipboard;
window.showNotification = showNotification;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.validateForm = validateForm;
window.debounce = debounce;
window.formatNumber = formatNumber;
window.escapeHtml = escapeHtml;
