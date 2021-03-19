export const validation = {
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