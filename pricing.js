// Pricing tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get tab elements
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and tab contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
            
            // Add animation to pricing cards
            const cards = document.querySelectorAll(`#${tabId}-content .pricing-card`);
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animated');
                }, 100 * index);
            });
        });
    });

    // Price toggle functionality (monthly/annual)
    const priceToggle = document.getElementById('price-toggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    const toggleLabels = document.querySelectorAll('.toggle-label');

    if(priceToggle) {
        priceToggle.addEventListener('change', () => {
            if(priceToggle.checked) {
                // Show yearly prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'block');
                toggleLabels[1].classList.add('active');
                toggleLabels[0].classList.remove('active');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'block');
                yearlyPrices.forEach(price => price.style.display = 'none');
                toggleLabels[0].classList.add('active');
                toggleLabels[1].classList.remove('active');
            }
        });
    }

    // Interactive hover effects for pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if(!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if(!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow)';
            }
        });
    });
    
    // Custom packages interaction
    const customPackageButtons = document.querySelectorAll('.custom-feature');
    if(customPackageButtons.length > 0) {
        customPackageButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });
    }
});