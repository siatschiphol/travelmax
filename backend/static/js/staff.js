document.addEventListener('DOMContentLoaded', function() {
    // Initialize Earnings Chart
    const ctx = document.getElementById('earningsChart').getContext('2d');
    const earningsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Earnings',
                data: [25000, 19000, 28000, 21000, 18000, 15000, 19000, 25000, 24000, 23000, 19000, 28000],
                backgroundColor: '#4e73e1',
                borderRadius: 5,
                maxBarThickness: 25
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: '#f0f0f0'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Handle sidebar toggle
    document.getElementById('sidebarCollapse')?.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle table checkboxes
    const mainCheckbox = document.querySelector('thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');

    mainCheckbox?.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = mainCheckbox.checked;
        });
    });

    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
            
            if (mainCheckbox) {
                mainCheckbox.checked = allChecked;
                mainCheckbox.indeterminate = someChecked && !allChecked;
            }
        });
    });

    // Handle New Listing dropdown
    const newListingBtn = document.getElementById('newListingBtn');
    const listingDropdown = document.getElementById('listingDropdown');

    newListingBtn?.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the link from navigating
        e.stopPropagation();
        listingDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.listing-dropdown-container')) {
            listingDropdown?.classList.remove('show');
        }
    });

    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll('.listing-dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            listingDropdown.classList.remove('show');
            // Handle the click action here
            console.log('Selected:', this.textContent.trim());
        });
    });
});
