
export interface ErrorType {
    email?: string;
    password?: string;
    message?: string;
    confirmPassword?: string;
    terms?: string;
}

interface FormDataType {
    email: string;
    password: string;
    confirmPassword?: string;
    terms?: boolean;
}

export function validateForm(formData: FormDataType) {
    const errors: ErrorType = {};
    const { email, password, confirmPassword, terms } = formData;

    // Email
    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email";
    }

    // Password
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    // Confirm password: only when provided
    if (confirmPassword !== undefined) {
        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
    }

    // Terms: only when provided
    if (terms !== undefined && !terms) {
        errors.terms = "You must accept the terms and conditions";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
