import React from 'react';
import { Button } from 'react-bootstrap';

export default function TitlePages({ title, children }) {
  return (
    <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
      <h1 className='m-0 p-0'>
        {title}
      </h1>
      {children}
    </div>
  )
}
