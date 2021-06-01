import React from 'react';
import { Button } from 'reactstrap';

import Sidebar from '../shared/Sidebar'

const showAlert = () => {
  alert('You clicked a button!')
};
export default function HomePage() {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8">
        <p>This is the Home Page. Yay! Check! </p>
        <p>Here is a Button</p>
        <Button onClick={showAlert}>Click Me</Button>
      </div>
      
      <Sidebar />
    </div>
  );
}
