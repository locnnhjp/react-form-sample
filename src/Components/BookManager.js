import { useState } from "react";
import { Formik } from "formik";

function BookManager() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({});
    const [indexSelected, setIndexSelected] = useState(-1);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleValidate() {
        let errors = {};
        if (!form.title) {
            errors.title = "Required";
        }

        if (!form.number) {
            errors.number = "Required";
        } else if (isNaN(form.number)) {
            errors.number = "Must input numbers";
        }

        return errors;
    }

    function handleSelect(book, indexSelected) {
        setForm(book);
        setIndexSelected(indexSelected);
    }

    function handleDelete(index) {
        let newBooks = JSON.parse(JSON.stringify(books));
        newBooks.splice(index, 1);
        setBooks(newBooks);
    }

    function handleSubmit() {
        let newBooks = JSON.parse(JSON.stringify(books));
        if (indexSelected > -1) {
            newBooks.splice(indexSelected, 1, form);
        } else {
            newBooks.push(form);
        }
        setBooks(newBooks);
        setForm({});
        setIndexSelected(-1);
    }

    return (
        <div className="container">
            <h1>Library</h1>
            <Formik
                initialValues={form}
                validate={handleValidate}
                onSubmit={handleSubmit}
            >
                {({ errors, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`custom-input ${
                                errors.title ? "custom-input-error" : ""
                            }`}
                        >
                            <label htmlFor="title">Title</label>
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
                                errors.number ? "custom-input-error" : ""
                            }`}
                        >
                            <label>Number</label>
                            <input
                                type="text"
                                name="number"
                                value={form.number || ""}
                                onChange={handleChange}
                            />
                            <p className="error">{errors.number}</p>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
            {books.length > 0 ? (
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Number</th>
                        <th>Actions</th>
                    </tr>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.number}</td>
                            <td>
                                <button
                                    onClick={() => handleSelect(book, index)}
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(index)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            ) : (
                <p style={{ textAlign: "center" }}>No data</p>
            )}
        </div>
    );
}

export default BookManager;
