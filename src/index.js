import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@/common/Button';

const App = () => (
  <div>
    <Button>
      Button!
    </Button>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
