// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get all elements with the class "lab-item"
    const labItems = document.querySelectorAll('.lab-item');
    
    // Get the notification element
    const notification = document.getElementById('copy-notification');

    // Variable to hold the timer for the notification
    let notificationTimer;

    // Loop through each lab-item (each <a> tag)
    labItems.forEach(item => {
        
        // Add a click event listener to each one
        item.addEventListener('click', (event) => {
            
            // 1. Prevent the link from jumping to the top of the page
            event.preventDefault(); 
            
            let textToCopy = ''; // Will hold the text we want to copy

            // 2. MODIFIED LOGIC: Check for a data-copy-target attribute
            const targetId = item.dataset.copyTarget;
            
            if (targetId) {
                // If it exists, find the element with that ID
                const codeElement = document.getElementById(targetId);
                if (codeElement) {
                    // Get the text from the <textarea>
                    textToCopy = codeElement.value;
                } else {
                    // Fallback in case the ID is wrong
                    console.warn(`Could not find element with ID: ${targetId}`);
                    textToCopy = item.innerText;
                }
            } else {
                // If no data-copy-target, just copy the box's visible text
                textToCopy = item.innerText;
            }

            // 3. Use the modern Clipboard API to copy the determined text
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // SUCCESS:
                    // Show the notification
                    notification.classList.add('show');

                    // Clear any existing timer so it resets
                    if (notificationTimer) {
                        clearTimeout(notificationTimer);
                    }

                    // Set a timer to hide the notification after 2 seconds
                    notificationTimer = setTimeout(() => {
                        notification.classList.remove('show');
                    }, 2000);

                })
                .catch(err => {
                    // ERROR:
                    console.error('Failed to copy text: ', err);
                });
        });
    });
});