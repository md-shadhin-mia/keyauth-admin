"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from "@/components/ui/input"; // Adjust import based on your component library
import { Button } from "@/components/ui/button"; // Adjust import based on your component library

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required'),
  last_name: Yup.string()
    .required('Last name is required'),
  contacts: Yup.array().of(
    Yup.object().shape({
      phone: Yup.string()
        .required('Phone number is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      address: Yup.string()
        .required('Address is required'),
    })
  ).required('At least one contact is required'),
  banks: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Bank name is required'),
      account_number: Yup.string()
        .required('Account number is required'),
      account_name: Yup.string()
        .required('Account name is required'),
      bank_code: Yup.string()
        .required('Bank code is required'),
    })
  ).required('At least one bank is required'),
});

export const EmployeeForm = () => {
  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        contacts: [{ id: undefined, phone: '', email: '', address: '' }],
        banks: [{ id: undefined, name: '', account_number: '', account_name: '', bank_code: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="first_name">First Name</label>
            <Field type="text" name="first_name" as={Input} />
            <ErrorMessage name="first_name" component="div" />
          </div>
          
          <div>
            <label htmlFor="last_name">Last Name</label>
            <Field type="text" name="last_name" as={Input} />
            <ErrorMessage name="last_name" component="div" />
          </div>

          {/* Contacts */}
          <h3>Contacts</h3>
          {values.contacts.map((contact, index) => (
            <div key={index}>
              <h4>Contact {index + 1}</h4>
              <div>
                <label htmlFor={`contacts.${index}.phone`}>Phone</label>
                <Field type="text" name={`contacts.${index}.phone`} as={Input} />
                <ErrorMessage name={`contacts.${index}.phone`} component="div" />
              </div>
              <div>
                <label htmlFor={`contacts.${index}.email`}>Email</label>
                <Field type="text" name={`contacts.${index}.email`} as={Input} />
                <ErrorMessage name={`contacts.${index}.email`} component="div" />
              </div>
              <div>
                <label htmlFor={`contacts.${index}.address`}>Address</label>
                <Field type="text" name={`contacts.${index}.address`} as={Input} />
                <ErrorMessage name={`contacts.${index}.address`} component="div" />
              </div>
            </div>
          ))}

          {/* Banks */}
          <h3>Banks</h3>
          {values.banks.map((bank, index) => (
            <div key={index}>
              <h4>Bank {index + 1}</h4>
              <div>
                <label htmlFor={`banks.${index}.name`}>Bank Name</label>
                <Field type="text" name={`banks.${index}.name`} as={Input} />
                <ErrorMessage name={`banks.${index}.name`} component="div" />
              </div>
              <div>
                <label htmlFor={`banks.${index}.account_number`}>Account Number</label>
                <Field type="text" name={`banks.${index}.account_number`} as={ Input} />
                <ErrorMessage name={`banks.${index}.account_number`} component="div" />
              </div>
              <div>
                <label htmlFor={`banks.${index}.account_name`}>Account Name</label>
                <Field type="text" name={`banks.${index}.account_name`} as={Input} />
                <ErrorMessage name={`banks.${index}.account_name`} component="div" />
              </div>
              <div>
                <label htmlFor={`banks.${index}.bank_code`}>Bank Code</label>
                <Field type="text" name={`banks.${index}.bank_code`} as={Input} />
                <ErrorMessage name={`banks.${index}.bank_code`} component="div" />
              </div>
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;