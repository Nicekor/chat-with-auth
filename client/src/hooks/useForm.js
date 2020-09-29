import { useState, useEffect } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      callback();
    }
    return () => {
      setIsSubmitting(false);
    };
  }, [callback, isSubmitting]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleFormChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return { values, handleFormSubmit, handleFormChange };
};

export default useForm;
