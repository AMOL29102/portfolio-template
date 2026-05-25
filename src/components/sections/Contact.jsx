import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import AnimatedText from '../ui/AnimatedText';
import { personalInfo } from '../../data/portfolio';

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  outline: 'none',
  transition: 'all 0.3s',
  background: 'var(--color-bg-tertiary)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border)',
};

const labelStyle = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '8px',
  color: 'var(--color-text-muted)',
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <SectionWrapper id="contact">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Left — Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            fontFamily: 'Space Grotesk, system-ui, sans-serif',
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--accent)', letterSpacing: '0.1em' }}>05.</span>
            <AnimatedText text="Get In Touch" staggerDelay={0.03} />
          </h2>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '24px',
              color: 'var(--color-text-secondary)',
            }}
          >
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out if you'd like to work together or just say hi.
          </p>

          {/* Quick Contact Info */}
          <a
            href={personalInfo.social.email}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            <Send size={14} style={{ color: 'var(--accent)' }} />
            {personalInfo.email}
          </a>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="glass" style={{ borderRadius: '20px', padding: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} id="contact-form">
              {/* Name & Email side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: '4px' }}>
                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#34D399' }}
                    >
                      <CheckCircle size={14} />
                      Message sent! I'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: '#FB7185' }}
                    >
                      <AlertCircle size={14} />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  id="contact-submit-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'var(--accent)',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    flexShrink: 0,
                    transition: 'all 0.3s',
                    boxShadow: '0 0 20px var(--accent-glow)',
                    opacity: status === 'sending' ? 0.6 : 1,
                  }}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={14} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
