// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get the notification elements
    const copyNotification = document.getElementById('copy-notification');
    const unavailableNotification = document.getElementById('unavailable-notification');
    let notificationTimer;

    /**
     * Helper function to show a notification.
     * It clears any existing timers and hides other popups.
     * @param {HTMLElement} notificationElement The notification element to show.
     */
    function showNotification(notificationElement) {
        // Clear any existing timer
        if (notificationTimer) {
            clearTimeout(notificationTimer);
        }
        
        // Hide all notifications first
        copyNotification.classList.remove('show');
        unavailableNotification.classList.remove('show');

        // Show the correct one
        notificationElement.classList.add('show');

        // Set a timer to hide it after 2 seconds
        notificationTimer = setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 2000);
    }


    // 1. Add click listeners for "Copy" items
    document.querySelectorAll('.lab-item[data-copy-target]').forEach(item => {
        
        item.addEventListener('click', (event) => {
            // Prevent the <a> tag from navigating
            event.preventDefault(); 
            
            const targetId = item.dataset.copyTarget;
            const codeElement = document.getElementById(targetId);
            
            if (codeElement) {
                const textToCopy = codeElement.value;
                
                // Use the modern Clipboard API
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        // SUCCESS: Show the "Copied!" notification
                        showNotification(copyNotification);
                    })
                    .catch(err => {
                        // ERROR:
                        console.error('Failed to copy text: ', err);
                    });
            } else {
                console.warn(`Could not find element with ID: ${targetId}`);
            }
        });
    });

    // 2. Add click listeners for "Unavailable" items
    document.querySelectorAll('.lab-item.unavailable').forEach(item => {
        
        item.addEventListener('click', (event) => {
            // Prevent the <a> tag from navigating
            event.preventDefault(); 
            
            // Show the "Not Available" notification
            showNotification(unavailableNotification);
        });
    });

    // 3. For "Download" items (those with 'download' attribute)
    // No JavaScript is needed. By *not* selecting them and *not*
    // calling event.preventDefault(), the browser's default
    // download behavior will work perfectly.

});