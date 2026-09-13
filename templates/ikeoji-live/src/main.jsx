import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Landing from './Landing.jsx';

const root = document.getElementById('root');
if (root.hasChildNodes()) hydrateRoot(root, <Landing />);
else createRoot(root).render(<Landing />);
