// Load congressmen data from JSON
fetch('congressmen.json')
    .then(response => response.json())
    .then(data => {
        const congressmen = data.congressmen;

        // Select HTML elements
        const congressmanDropdown = document.getElementById('congressmanDropdown');
        const constituencyDropdown = document.getElementById('constituencyDropdown');
        const sendEmailLink = document.getElementById('sendEmailLink');
        const emailTextArea = document.getElementById('emailText');

        // Populate the dropdowns with options
        congressmen.forEach(congressman => {
            const congressmanOption = document.createElement('option');
            congressmanOption.value = congressman.name;
            congressmanOption.textContent = congressman.name;
            congressmanDropdown.appendChild(congressmanOption);

            const constituencyOption = document.createElement('option');
            constituencyOption.value = congressman.constituency;
            constituencyOption.textContent = congressman.constituency;
            constituencyDropdown.appendChild(constituencyOption);
        });

        // Function to handle the form update and enable the send button
        function updateForm(selectedCongressman, selectedConstituency) {
            // Find the congressman based on the selection
            const congressmanData = congressmen.find(
                congressman => congressman.name === selectedCongressman || congressman.constituency === selectedConstituency
            );

                // Update both dropdowns based on the found congressman
                congressmanDropdown.value = congressmanData.name;
                constituencyDropdown.value = congressmanData.constituency;

                // Construct the email body dynamically
                const emailBody = `Dear ${congressmanData.name},\n\nI am writing to express my concerns as a constituent of ${congressmanData.constituency}. Please address these issues at your earliest convenience.\n\nRegards,`;

                // Set the textarea content
                emailTextArea.textContent = emailBody;

                // Create the mailto link with subject and body
                const mailtoLink = `mailto:${congressmanData.email}?subject=${encodeURIComponent('Concerns from a constituent')}&body=${encodeURIComponent(emailBody)}`;

                // Enable the send button and set the href attribute for the mailto link
                sendEmailLink.href = mailtoLink;
        }

        // Event listeners for both congressman and constituency dropdowns
        congressmanDropdown.addEventListener('change', function () {
            updateForm(this.value, null);  // Update when congressman is selected
        });

        constituencyDropdown.addEventListener('change', function () {
            updateForm(null, this.value);  // Update when constituency is selected
        });
    })
    .catch(error => console.error('Error loading congressman data:', error));
