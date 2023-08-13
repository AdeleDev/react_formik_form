import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <>
                    <label htmlFor={props.name}>{label}</label>
                    <input {...field} {...props} />
                    {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
            </>
        );
};

const MyCheckbox = ({ children, ...props }) => {
        const [field, meta] = useField({ ...props, type: 'checkbox' });
        return (
            <>
                    <label className="checkbox">
                            <input type="checkbox" {...field} {...props} />
                            {children}
                    </label>
                    {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
            </>
        );
};

const CustomForm = () => {

        return (
            <Formik
                initialValues = {{
                        name: '',
                        email: '',
                        amount: 0,
                        currency: '',
                        text: '',
                        terms: false
                }}
                validationSchema = {Yup.object({
                        name: Yup.string()
                            .min(2, '2 symbols minimum')
                            .required('Mandatory field!'),
                        email: Yup.string()
                            .email('Wrong email address')
                            .required('Mandatory field!'),
                        amount: Yup.number()
                            .required('Amount is mandatory')
                            .min(5, 'Not less than 5'),
                        currency: Yup.string().required('Choose currency'),
                        text: Yup.string()
                            .min(10, '10 symbols minimum'),
                        terms: Yup.boolean()
                            .required('Need agreement')
                            .oneOf([true], "Need agreement")
                })}
                onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
            >
                    <Form className="form">
                            <h2>Send anonymous payment</h2>
                            <MyTextInput
                                label="Your name"
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="off"
                            />
                            <MyTextInput
                                label="Yor mail"
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                            />
                            <label htmlFor="amount">Amount</label>
                            <Field
                                id="amount"
                                name="amount"
                                type="number"
                                autoComplete="off"
                            />
                            <ErrorMessage component="div" className="error" name="amount"/>
                            <label htmlFor="currency">Currency</label>
                            <Field
                                id="currency"
                                name="currency"
                                as="select"
                            >
                                    <option value="">Choose currency</option>
                                    <option value="USD">USD</option>
                                    <option value="UAH">UAH</option>
                                    <option value="RUB">RUB</option>
                            </Field>
                            <ErrorMessage component="div" className="error" name="currency"/>
                            <label htmlFor="text">Message</label>
                            <Field
                                id="text"
                                name="text"
                                as="textarea"
                            />
                            <ErrorMessage component="div" className="error" name="text"/>
                            <MyCheckbox name="terms">
                                    Agreement with Confidential Policy
                            </MyCheckbox>
                            <button type="submit">Send</button>
                    </Form>
            </Formik>
        )
}

export default CustomForm;