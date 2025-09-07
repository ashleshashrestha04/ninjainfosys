"use client";

import React, { useState, useEffect } from 'react';
import { Form, TextInput, Select, SelectItem, TextArea, Button, InlineNotification } from '@carbon/react';
import { useTranslations } from 'next-intl';
import { useTickets } from '../../../../store/useTickets';
import '../../../../components/header.css';

interface Ward {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface FormErrors {
  fullName: string;
  phoneNumber: string;
  description: string;
}

const SubmitTicketPage = () => {
  const t = useTranslations();
  const { addTicket } = useTickets();
  const [wards, setWards] = useState<Ward[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    ward: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    phoneNumber: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load wards from API
    fetch('/api/wards')
      .then((response) => response.json())
      .then((data) => setWards(data))
      .catch(() => setWards([]));

    // Load categories from API
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be exactly 10 digits';
        }
        break;
      case 'description':
        if (!value.trim()) {
          error = 'Description is required';
        } else if (value.trim().length < 20) {
          error = 'Description must be at least 20 characters long';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits
    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: digitsOnly,
      }));
      validateField(name, digitsOnly);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
      // Validate specific fields on change
      if (name === 'fullName' || name === 'description') {
        validateField(name, value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const isFullNameValid = validateField('fullName', formData.fullName);
    const isPhoneValid = validateField('phoneNumber', formData.phoneNumber);
    const isDescriptionValid = validateField('description', formData.description);
    
    if (isFullNameValid && isPhoneValid && isDescriptionValid && formData.ward && formData.category) {
      setIsSubmitting(true);
      setShowSuccess(false);
      
      try {
        const response = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Form Data Submitted:', formData);
          console.log('API Response:', result);
          
          // Add ticket to Zustand store
          addTicket({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            ward: formData.ward,
            category: formData.category,
            description: formData.description,
          });
          
          // Reset form
          setFormData({
            fullName: '',
            phoneNumber: '',
            ward: '',
            category: '',
            description: '',
          });
          
          // Clear errors
          setErrors({
            fullName: '',
            phoneNumber: '',
            description: '',
          });
          
          // Show success message
          setShowSuccess(true);
          
          // Hide success message after 5 seconds
          setTimeout(() => setShowSuccess(false), 5000);
        } else {
          console.error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="citizen-form-container">
      <h1 className="citizen-form-title">{t('citizen.form.title')}</h1>
      
      {showSuccess && (
        <InlineNotification
          kind="success"
          title="Success!"
          subtitle="Your ticket has been submitted successfully."
          hideCloseButton={false}
          onCloseButtonClick={() => setShowSuccess(false)}
          style={{ marginBottom: '1.5rem' }}
        />
      )}
      
      <Form onSubmit={handleSubmit}>
        <div className="form-field">
          <TextInput
            id="fullName"
            name="fullName"
            labelText={t('citizen.form.fullName')}
            value={formData.fullName}
            onChange={handleChange}
            invalid={!!errors.fullName}
            invalidText={errors.fullName}
            required
          />
        </div>
        <div className="form-field">
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            labelText={t('citizen.form.phoneNumber')}
            value={formData.phoneNumber}
            onChange={handleChange}
            invalid={!!errors.phoneNumber}
            invalidText={errors.phoneNumber}
            maxLength={10}
            required
          />
        </div>
        <div className="form-field">
          <Select
            id="ward"
            name="ward"
            labelText={t('citizen.form.ward')}
            value={formData.ward}
            onChange={handleChange}
            required
          >
            <SelectItem text={t('citizen.form.selectWard')} value="" />
            {wards.map((ward) => (
              <SelectItem key={ward.id} text={ward.name} value={ward.id} />
            ))}
          </Select>
        </div>
        <div className="form-field">
          <Select
            id="category"
            name="category"
            labelText={t('citizen.form.category')}
            value={formData.category}
            onChange={handleChange}
            required
          >
            <SelectItem text={t('citizen.form.selectCategory')} value="" />
            {categories.map((category) => (
              <SelectItem key={category.id} text={category.name} value={category.id} />
            ))}
          </Select>
        </div>
        <div className="form-field">
          <TextArea
            id="description"
            name="description"
            labelText={t('citizen.form.description')}
            value={formData.description}
            onChange={handleChange}
            invalid={!!errors.description}
            invalidText={errors.description}
            helperText={`${formData.description.length}/20 characters minimum`}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : t('citizen.form.submit')}
        </Button>
      </Form>
    </div>
  );
};

export default SubmitTicketPage;
