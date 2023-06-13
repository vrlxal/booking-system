import React, { useState } from "react";
import FormInput from "./FormInput";
import TimePicker from "./Timepicker";
import { Input } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookingForm = ({ handleSubmit }) => {

    const [formValues, setFormValues] = useState({
        name: {
            value: "",
            error: false,
            errorMessage: "You must enter a name"
        },
        date: {
            value: "",
            error: false,
            errorMessage: "You must select a date"
        },
        unitNumber: {
            value: "",
            error: false,
            errorMessage: "You must enter a unit number"
        },
        startTime: {
            value: "",
            error: false,
            errorMessage: "You must select a start time"
        },
        endTime: {
            value: "",
            error: false,
            errorMessage: "You must select an end time"
        },
        purpose: {
            value: "",
            error: false,
            errorMessage: "You must state a purpose"
        }
    });

    const handleChange = (e, field) => {
        let value;
        if (field === "startTime" || field === "endTime") {
            let date = new Date(e.$d);
            let isoDate = date.toISOString();
            let formattedDate = isoDate.slice(0, -5) + 'Z';
            console.log("DATE: ", formattedDate);
            value = formattedDate;
        } else if (field === "date") {
            value = e.format('YYYY-MM-DDTHH:mm:ssZ');
        } else {
            value = e.target.value;
        }
        console.log("value: ", value)
        setFormValues({
            ...formValues,
            [field]: {
                ...formValues[field],
                value: value,
                error: value ? false : true,
            }
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isError = false;
        let newFormValues = { ...formValues };

        Object.keys(formValues).forEach((key) => {
            const field = formValues[key];
            if (!field.value) {
                newFormValues[key].error = true;
                isError = true;
            }
        });

        setFormValues(newFormValues);
        if (!isError) {
            handleSubmit(formValues.name.value, formValues.date.value,
                formValues.unitNumber.value, formValues.startTime.value, formValues.endTime.value, formValues.purpose.value);
        }
    };


    return (
        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <FormInput
                title="Name"
                type="text"
                id="name"
                autoComplete="name"
                value={formValues.name.value}
                error={formValues.name.error}
                errorMessage={formValues.name.errorMessage}
                onChange={(e) => handleChange(e, 'name')}
            >
            </FormInput>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date of requested booking"
                    type="date"
                    id="date"
                    autoComplete="date"
                    value={formValues.date.value}
                    error={formValues.date.error}
                    errorMessage={formValues.date.errorMessage}
                    onChange={(e) => handleChange(e, 'date')}
                >
                </DatePicker>
            </LocalizationProvider>
            <FormInput
                title="Unit Number"
                type="text"
                id="unit-number"
                autoComplete="unit-number"
                value={formValues.unitNumber.value}
                error={formValues.unitNumber.error}
                errorMessage={formValues.unitNumber.errorMessage}
                onChange={(e) => handleChange(e, 'unitNumber')}
            >
            </FormInput>

            <TimePicker
                title="Start Time"
                id="start-time"
                value={formValues.startTime.value}
                error={formValues.startTime.error}
                errorMessage={formValues.startTime.errorMessage}
                onChange={(e) => handleChange(e, 'startTime')}
            />

            <TimePicker
                title="End Time"
                id="end-time"
                value={formValues.endTime.value}
                error={formValues.endTime.error}
                errorMessage={formValues.endTime.errorMessage}
                onChange={(e) => handleChange(e, 'endTime')}
            />

            <FormInput
                title="Purpose"
                type="text"
                id="purpose"
                autoComplete="purpose"
                value={formValues.purpose.value}
                error={formValues.purpose.error}
                errorMessage={formValues.purpose.errorMessage}
                onChange={(e) => handleChange(e, 'purpose')}
            >
            </FormInput>

            <Input type="submit" value="Submit" className="btn btn-primary mb-3"></Input>
        </form>
    );
};

export default BookingForm;
