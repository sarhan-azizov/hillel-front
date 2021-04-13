import React from 'react';

import { Controller } from 'react-hook-form';
import { Button, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FormControlLabel } from '@material-ui/core';

import styles from './create-lesson.module.scss';

import { TypeLessonComponentAPI } from './types';
import { TextField, Checkbox } from '../../atoms';
import { validation } from './validation';

export const CreateLessonFormComponent = (props: TypeLessonComponentAPI) => (
    <form onSubmit={props.form.handleSubmit(props.onSubmit)} onChange={props.onChange} noValidate autoComplete="off" className={styles.form}>
        <TextField
            error={Boolean(props.form.errors.name)}
            helperText={props.form.errors.name?.message}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
            inputRef={props.form.register(validation.name)}
        />
        <TextField
            error={Boolean(props.form.errors.description)}
            helperText={props.form.errors.firstName?.message}
            multiline
            rows={4}
            color="primary"
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Description"
            name="description"
            inputRef={props.form.register(validation.description)}
        />
        <FormControlLabel
            control={
                <Controller
                    label="Activated"
                    name="activated"
                    defaultValue={true}
                    control={props.form.control}
                    render={({ ref, ...field }: any) => <Checkbox {...field} {...props.form} />}
                />
            }
            label="Activated"
        />

        {props.form.errors.form && <Alert severity="error">{props.form.errors.form?.message}</Alert>}
        <Box mt={1}>
            <Button
                type="submit"
                fullWidth
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
            >
                Create Lesson
            </Button>
        </Box>
    </form>
);
