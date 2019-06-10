import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './index/Index.page';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Index} />
    </Router>
  );
}

export default App;
