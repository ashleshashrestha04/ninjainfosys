import React from 'react';
import { Search } from '@carbon/react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  disabled = false,
  size = 'md',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <Search
      size={size}
      labelText="Search"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      disabled={disabled}
      style={{ marginBottom: '1rem' }}
    />
  );
};
