// MetaWrapper.tsx
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaWrapperProps {
  element: ReactElement;
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
}

const MetaWrapper: React.FC<MetaWrapperProps> = ({
  element,
  pageTitle,
  pageDescription,
  pageKeywords,
}) => {
  return (
    <>
      <Helmet>
        {pageTitle && <title>{pageTitle}</title>}
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
        {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      </Helmet>
      {element}
    </>
  );
};

export default MetaWrapper;
