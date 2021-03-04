// TODO temporarily solution
const nameValidationRules = {
    required: {
        value: true,
        message: 'The field is required'
    },
    minLength: {
        value: 3,
        message: "The field shouldn't be less then 3"
    },
    maxLength: {
        value: 80,
        message: "The field shouldn't be more then 80"
    }
};

export const validation = {
    username: nameValidationRules,
    firstName: nameValidationRules,
    lastName: nameValidationRules,
    email: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 5,
            message: "The field shouldn't be less then 5"
        },
        maxLength: {
            value: 80,
            message: "The field shouldn't be more then 80"
        },
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
        }
    },
    password: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 5,
            message: "The field shouldn't be less then 5"
        },
        maxLength: {
            value: 80,
            message: "The field shouldn't be more then 80"
        }
    },
    confirmPassword: (watch: any) => ({
        validate: (value: any) => (value === '' || value !== watch('password')) ? 'Password mismatch': true
    })
}