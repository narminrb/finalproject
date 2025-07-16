import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import api from '../../api/axios';
import './styles.css';
import { getContactElements } from '../../api/contactelements';

const ContactComponent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['contactElements'],
    queryFn: getContactElements,
  });

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const mutation = useMutation({
    mutationFn: (newMessage) => api.post('/contacts/create', newMessage),
    onSuccess: () => {
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
      queryClient.invalidateQueries(['contactElements']);
    },
    onError: () => {
      alert("Error sending message");
    },
  });
  

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading contact elements</p>;

  const elements = data?.elements || [];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className='home-categories-bg py-2'>
      <div className="container max-w-screen-xl mx-auto px-3 relative">
        <div className="contact-detail-container">
          <div className="blog-header-img">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.3111418599!2d-73.969231!3d40.7590615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2zTWFuaGV0dGVuLCBOeXUtWW9yaywgTnl1IFlvcmssIEFtZXJpa2EgQmlybMmZxZ9tacWfIMWedGF0bGFyxLE!5e0!3m2!1saz!2saz!4v1752685022106!5m2!1saz!2saz"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>

          <div className="contact-content">
            {elements.map((element) => (
              <div key={element._id} className="mb-8 text-center">
                <img
                  src={`http://localhost:3000/${element.image.replace(/\\/g, '/')}`}
                  alt={element.name}
                  style={{ maxWidth: '250px', borderRadius: '12px', margin: '0 auto 10px' }}
                />
                <h3 className='element_name'>{element.name}</h3>
                <p className='element_desc'>{element.description}</p>
              </div>
            ))}

          </div>
            <div className='element_form'>
            <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-row">
                <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>

            <div>
                <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                />
            </div>

            <div>
                <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Sending...' : 'Send A Message'}
                </button>
            </div>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
