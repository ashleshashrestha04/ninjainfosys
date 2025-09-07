import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb style={{ marginBottom: '1rem' }}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          href={item.href}
          isCurrentPage={item.isCurrentPage}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
