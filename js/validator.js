/**
 * Form Validator - Real-time validation for all forms
 */

class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;
        
        this.fields = {
            name: {
                element: this.form.querySelector('[name="name"], [name="enquiryName"], #enquiryName'),
                rules: [
                    { test: v => v.trim().length > 0, message: 'Name is required' },
                    { test: v => v.trim().length >= 2, message: 'Name must be at least 2 characters' },
                    { test: v => /^[a-zA-Z\s]+$/.test(v), message: 'Name can only contain letters and spaces' }
                ]
            },
            phone: {
                element: this.form.querySelector('[name="phone"], [name="enquiryPhone"], #enquiryPhone'),
                rules: [
                    { test: v => v.trim().length > 0, message: 'Phone number is required' },
                    { test: v => /^[0-9]{10}$/.test(v.replace(/\D/g, '')), message: 'Enter a valid 10-digit phone number' }
                ]
            },
            email: {
                element: this.form.querySelector('[name="email"], [name="enquiryEmail"], #enquiryEmail'),
                rules: [
                    { test: v => v.trim().length > 0, message: 'Email is required' },
                    { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Enter a valid email address' }
                ]
            },
            studentClass: {
                element: this.form.querySelector('[name="studentClass"], [name="enquiryClass"], #enquiryClass'),
                rules: [
                    { test: v => v !== '' && v !== 'Select Class', message: 'Please select a class' }
                ]
            },
            location: {
                element: this.form.querySelector('[name="location"], [name="enquiryLocation"], #enquiryLocation'),
                rules: [
                    { test: v => v.trim().length > 0, message: 'Location is required' },
                    { test: v => v.trim().length >= 3, message: 'Location must be at least 3 characters' }
                ]
            },
            message: {
                element: this.form.querySelector('[name="message"], textarea'),
                rules: [
                    { test: v => v.trim().length > 0, message: 'Message is required' },
                    { test: v => v.trim().length >= 10, message: 'Message must be at least 10 characters' }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        // Real-time validation on input
        Object.values(this.fields).forEach(field => {
            if (!field.element) return;
            
            field.element.addEventListener('input', () => this.validateField(field));
            field.element.addEventListener('blur', () => this.validateField(field));
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    validateField(field) {
        if (!field.element) return true;
        
        const value = field.element.value;
        const container = field.element.closest('.mb-3') || field.element.parentElement;
        
        // Remove old feedback
        const oldFeedback = container.querySelector('.invalid-feedback, .valid-feedback');
        if (oldFeedback) oldFeedback.remove();
        
        field.element.classList.remove('is-valid', 'is-invalid');
        
        // Test all rules
        for (const rule of field.rules) {
            if (!rule.test(value)) {
                this.showError(field.element, rule.message);
                return false;
            }
        }
        
        this.showSuccess(field.element);
        return true;
    }
    
    showError(element, message) {
        element.classList.add('is-invalid');
        const container = element.closest('.mb-3') || element.parentElement;
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        feedback.style.display = 'block';
        container.appendChild(feedback);
    }
    
    showSuccess(element) {
        element.classList.add('is-valid');
        const container = element.closest('.mb-3') || element.parentElement;
        const feedback = document.createElement('div');
        feedback.className = 'valid-feedback';
        feedback.textContent = 'Looks good!';
        feedback.style.display = 'block';
        container.appendChild(feedback);
    }
    
    validateAll() {
        let isValid = true;
        Object.values(this.fields).forEach(field => {
            if (!this.validateField(field)) isValid = false;
        });
        return isValid;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateAll()) {
            // Shake animation for invalid form
            this.form.style.animation = 'shake 0.5s ease';
            setTimeout(() => this.form.style.animation = '', 500);
            
            // Focus first invalid field
            const firstInvalid = this.form.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }
        
        // Show success
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745, #34ce57)';
            
            // Show success modal/alert
            this.showSuccessModal();
            
            // Reset form
            this.form.reset();
            this.form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            this.form.querySelectorAll('.valid-feedback, .invalid-feedback').forEach(el => el.remove());
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    }
    
    showSuccessModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div class="modal fade" id="successModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content text-center p-4" style="border-radius: 20px; border: none;">
                        <div class="modal-body">
                            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #28a745, #34ce57); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <i class="fas fa-check" style="font-size: 2rem; color: #fff;"></i>
                            </div>
                            <h4 style="color: var(--dark); margin-bottom: 10px;">Thank You!</h4>
                            <p style="color: #777;">Your enquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
                            <button type="button" class="btn mt-3" data-bs-dismiss="modal" style="background: var(--gradient-1); color: #fff; padding: 10px 30px; border-radius: 25px;">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(document.getElementById('successModal'));
        bsModal.show();
        document.getElementById('successModal').addEventListener('hidden.bs.modal', () => modal.remove());
    }
}

// Shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize validator when sections are loaded
document.addEventListener('sectionsLoaded', () => {
    // Wait a bit for DOM to settle
    setTimeout(() => {
        const enquiryForm = document.querySelector('.footer-form');
        if (enquiryForm) {
            new FormValidator('.footer-form');
        }
    }, 100);
});
