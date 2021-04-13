import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MuiCheckbox } from '@material-ui/core';

export const Checkbox = ({ name, register, setValue, value }: any) => {
    const [checked, setChecked] = useState(false)

    const onChange = (e:any) => {
        const checked = e.target.checked

        setChecked(checked)
        setValue(name, checked)
    }

    useEffect(() => {
        register({ name })
    }, [name, register])

    useEffect(() => {
        if (value !== checked) {
            setChecked(value)
            setValue(name, value)
        }
    }, [name, value, setChecked, setValue])

    return <MuiCheckbox name={name} checked={checked} onChange={onChange} />
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    value: PropTypes.bool,
}