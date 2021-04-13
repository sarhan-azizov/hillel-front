export const validation = {
    name: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 5,
            message: "The field shouldn't be less then 5"
        },
        maxLength: {
            value: 120,
            message: "The field shouldn't be more then 120"
        }
    },
    description: {
        required: {
            value: true,
            message: 'The field is required'
        },
        minLength: {
            value: 5,
            message: "The field shouldn't be less then 5"
        },
        maxLength: {
            value: 500,
            message: "The field shouldn't be more then 500"
        }
    },
}