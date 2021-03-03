// TODO temporarily solution
export const validation = {
    login: {
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
    }
}