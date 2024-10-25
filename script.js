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

        // Default email body text for when no selection is made
        const defaultEmailBody = `Dear Congressman,
    I hope this message finds you well. As a US citizen of Pakistani origin, I deeply value the commitment of Congressmen towards protecting democracy and human rights around the globe. Your recent letter to President Biden, though well-intended, does not fully account for the realities and complexities on ground and misrepresents certain aspects of the situation. 
    I believe that facts have been biasedly presented due to the influence of coordinated campaigns by selected members of PTI. Pakistan’s recent elections were conducted under the supervision of international observers, including UN, and were found to meet acceptable standards without any significant concerns of fraud or irregularities. It may be noted that PTI not only won elections in KPK province but also emerged as the largest party in National assembly. Still their choice to reject the elections, is comprehensible as they failed to form the federal govt. 
    The letter, focuses on one political party aimed and show a clear bias. In reality, Mr. Imran Khan faces numerous criminal charges, some of which have been validated by lower courts, and his trials are ongoing in accordance with Pakistan's judicial system. I believe it may be premature to portray Mr. Khan's imprisonment as purely politically motivated or as a result of human rights violations without acknowledging the broader legal context.
    Moreover, Mr. Khan's divisive political approach, including his failure to foster inclusivity and his rhetoric for civil disobedience, coupled with violent protests incited by his supporters, has resulted in a lot of instability in Pakistan.
    Mr. Khan's controversial stances, such as his support for the Taliban during the US military efforts in Afghanistan and his characterization of Osama bin Laden as a "martyr," have caused significant concerns both domestically and internationally (ineligibility for Oxford Chancellorship is a testimonial). Content propagated in articles of different websites cited in your letter may not have fully captured the complexities of the legal cases surrounding Mr. Khan and the broader political environment in Pakistan.
    It is important to acknowledge that Pakistan's political landscape is deeply complex. The country faces numerous internal challenges, including terrorism, economic difficulties, and political instability. Any undesirable external pressure on the government may unintentionally exacerbate these issues, making it harder to foster a peaceful and stable democracy. It is essential that the US continues working with all stakeholders in Pakistan, rather than applying pressures which might alienate important partners and destabilize the region further.
    I urge you to reconsider your stance, in light of the points I have raised, before making further statements regarding Pakistan’s internal affairs.
Regards`;

        // Display initial default email body
        emailTextArea.textContent = decodeURIComponent(defaultEmailBody).replace(/%0A/g, '\n');

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

        // Function to get 10 random congressmen
        function getRandomCongressmen(count) {
            const shuffled = [...congressmen].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        // Function to update the mailto link based on selection or default
        function updateMailtoLink(selectedCongressman, selectedConstituency) {
            let selectedCongressmen;
            let emailBody;

            // Determine whether to use a specific or default body
            if (selectedCongressman || selectedConstituency) {
                // Find the selected congressman
                const congressmanData = congressmen.find(
                    congressman => congressman.name === selectedCongressman || congressman.constituency === selectedConstituency
                );
                
                if (congressmanData) {
                    // Custom email body for the selected congressman
                    emailBody = `Dear ${congressmanData.name},
    I hope this message finds you well. As a US citizen of Pakistani origin residing in ${congressmanData.constituency} ${congressmanData.position}, I deeply value the commitment of Congressmen towards protecting democracy and human rights around the globe. Your recent letter to President Biden, though well-intended, does not fully account for the realities and complexities on ground and misrepresents certain aspects of the situation. 
    I believe that facts have been biasedly presented due to the influence of coordinated campaigns by selected members of PTI. Pakistan’s recent elections were conducted under the supervision of international observers, including UN, and were found to meet acceptable standards without any significant concerns of fraud or irregularities. It may be noted that PTI not only won elections in KPK province but also emerged as the largest party in National assembly. Still their choice to reject the elections, is comprehensible as they failed to form the federal govt.
    The letter, focuses on one political party aimed and show a clear bias. In reality, Mr. Imran Khan faces numerous criminal charges, some of which have been validated by lower courts, and his trials are ongoing in accordance with Pakistan's judicial system. I believe it may be premature to portray Mr. Khan's imprisonment as purely politically motivated or as a result of human rights violations without acknowledging the broader legal context.
    Moreover, Mr. Khan's divisive political approach, including his failure to foster inclusivity and his rhetoric for civil disobedience, coupled with violent protests incited by his supporters, has resulted in a lot of instability in Pakistan.
    Mr. Khan's controversial stances, such as his support for the Taliban during the US military efforts in Afghanistan and his characterization of Osama bin Laden as a "martyr," have caused significant concerns both domestically and internationally (ineligibility for Oxford Chancellorship is a testimonial). Content propagated in articles of different websites cited in your letter may not have fully captured the complexities of the legal cases surrounding Mr. Khan and the broader political environment in Pakistan.
    It is important to acknowledge that Pakistan's political landscape is deeply complex. The country faces numerous internal challenges, including terrorism, economic difficulties, and political instability. Any undesirable external pressure on the government may unintentionally exacerbate these issues, making it harder to foster a peaceful and stable democracy. It is essential that the US continues working with all stakeholders in Pakistan, rather than applying pressures which might alienate important partners and destabilize the region further.
    I urge you to reconsider your stance, in light of the points I have raised, before making further statements regarding Pakistan’s internal affairs.
Regards,`;

                    // Set the selected congressman as the recipient
                    selectedCongressmen = [congressmanData];

                    // Synchronize dropdowns
                    if (selectedCongressman) {
                        constituencyDropdown.value = congressmanData.constituency;
                    } else {
                        congressmanDropdown.value = congressmanData.name;
                    }
                }
            } else {
                // Select 10 random congressmen and set the default email body
                selectedCongressmen = getRandomCongressmen(10);
                emailBody = defaultEmailBody;
            }

            if (selectedCongressmen.length) {
                // Concatenate the email addresses of all selected congressmen
                const emailAddresses = selectedCongressmen.map(congressman => congressman.email).join(',');

                // Create the mailto link with all recipients, subject, and encoded body
                const mailtoLink = `mailto:${emailAddresses}?subject=${encodeURIComponent('Concerns from a constituent')}&body=${emailBody}`;

                // Enable the send button and set the href attribute for the mailto link
                sendEmailLink.disabled = false;
                sendEmailLink.href = mailtoLink;

                // Update the textarea to show the email body in readable form
                emailTextArea.textContent = decodeURIComponent(emailBody).replace(/%0A/g, '\n');
            } else {
                // Reset if no valid selection
                emailTextArea.textContent = '';
                sendEmailLink.disabled = true;
                sendEmailLink.href = '#';
            }
        }

        // Initialize mailto link with 10 random congressmen
        updateMailtoLink(null, null);

        // Event listeners for both congressman and constituency dropdowns
        congressmanDropdown.addEventListener('change', function () {
            updateMailtoLink(this.value, null);  // Update when congressman is selected
        });

        constituencyDropdown.addEventListener('change', function () {
            updateMailtoLink(null, this.value);  // Update when constituency is selected
        });
    })
    .catch(error => console.error('Error loading congressman data:', error));
