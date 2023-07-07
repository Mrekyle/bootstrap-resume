function sendMail (contactForm) {
    emailjs.send("service_6tepuq5","template_ygys75k", {
        'from_name': contactForm.name.value, // Gets the name value from the contact form
        'from_email': contactForm.emailaddress.value, // Gets the email address value from the contact form 
        'project_request': contactForm.projectsummary.value,
        // Ensuring that these variables line up exactly with what is on the email template form on emailJS
    })
    .then (
        function (response) {
            console.log('Success', response) // Logging if the response from the server if it is successful
        },
        function (error) {
            console.log('Failed', error) // Logging if the email failed to send 
        });
    return false;
}
