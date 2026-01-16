// Copy Login, change to signup, add approvalCode input
import { useState } from 'react';
import { signup } from '../services/api.js';

const Signup = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '', approvalCode: '' });
  // ... handleSubmit uses signup(formData)
  // Add <input type="text" placeholder="Approval Code (for admin)" value={formData.approvalCode} ... />
};
