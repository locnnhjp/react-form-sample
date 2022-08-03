import { useState } from "react";
import { Formik } from "formik";

function EmailForm() {
    const REGEX = {
        to: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };

    const [form, setForm] = useState({});

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleValidate() {
        let errors = {};
        if (!form.to) {
            errors.to = "Required";
        } else if (!REGEX.to.test(form.to)) {
            errors.to = "Invalid email address";
        }
        if (!form.title) {
            errors.title = "Required";
        }

        if (!form.message) {
            errors.message = "Required";
        }

        return errors;
    }

    function handleSubmit() {
        alert("Sent successfully!!!");
        setForm({});
    }

    return (
        <div>
            <h1>Mail form</h1>
            <Formik
                initialValues={form}
                validate={handleValidate}
                onSubmit={handleSubmit}
            >
                {({ errors, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`custom-input ${
                                errors.to ? "custom-input-error" : ""
                            }`}
                        >
                            <label>To</label>
                            <input
                                type="email"
                                name="to"
                                value={form.to || ""}
                                onChange={handleChange}
                            />
                            <p className="error">{errors.to}</p>
                        </div>
                        <div
                            className={`custom-input ${
                                errors.title ? "custom-input-error" : ""
                            }`}
                        >
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title || ""}
                                onChange={handleChange}
                            />
                            <p className="error">{errors.title}</p>
                        </div>
                        <div
                            className={`custom-input ${
                                errors.message ? "custom-input-error" : ""
                            }`}
                        >
                            <label>Message</label>
                            <textarea name="message" value={form.message || ""} onChange={handleChange}></textarea>
                            <p className="error">{errors.message}</p>
                        </div>
                        <div className="custom-input">
                            <input type="file" onChange={handleChange}></input>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default EmailForm;
