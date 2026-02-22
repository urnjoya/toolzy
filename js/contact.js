function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm('contact-form')) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');

    // Reset form
    document.getElementById('contact-form').reset();
}