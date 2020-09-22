import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [callback, errors, isSubmitting]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleFormChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return { values, handleFormSubmit, handleFormChange, errors };
};

export default useForm;
