"use client";

import React, { useState } from 'react';
import { Form, TextInput, Button, Tile } from '@carbon/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { NotificationMessage } from '../../../components/NotificationMessage';
import '../../../components/header.css';

const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Validate field on change
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = validateField('email', formData.email);
    const isPasswordValid = validateField('password', formData.password);
    
    if (isEmailValid && isPasswordValid) {
      setIsSubmitting(true);
      setShowError(false);
      
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, accept any valid email/password
        console.log('Login Data:', formData);
        
        // Redirect to dashboard or home page
        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="citizen-form-container">
      <h1 className="citizen-form-title">{t('auth.login.title')}</h1>
      
      <p style={{ 
        marginBottom: '2rem', 
        color: 'var(--foreground)', 
        opacity: 0.7,
        textAlign: 'center'
      }}>
        {t('auth.login.subtitle')}
      </p>

      {showError && (
        <NotificationMessage
          type="error"
          title="Login Failed"
          subtitle="Invalid credentials. Please try again."
          onClose={() => setShowError(false)}
          timeout={5000}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <div className="form-field">
          <TextInput
            id="email"
            name="email"
            labelText={t('auth.login.email')}
            type="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!errors.email}
            invalidText={errors.email}
            required
          />
        </div>
        
        <div className="form-field">
          <TextInput
            id="password"
            name="password"
            labelText={t('auth.login.password')}
            type="password"
            value={formData.password}
            onChange={handleChange}
            invalid={!!errors.password}
            invalidText={errors.password}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth.login.signingIn') : t('auth.login.signIn')}
        </Button>
      </Form>

      <div style={{ 
        marginTop: '1.5rem', 
        textAlign: 'center',
        color: 'var(--foreground)',
        opacity: 0.7
      }}>
        <p style={{ fontSize: '0.875rem' }}>
          {t('auth.login.demoCredentials')}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
