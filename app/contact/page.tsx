'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { loadPersonalInfo, loadSocialLinks } from '@/lib/data-loader';
import { SocialLinks } from '@/components/sections/social-links';
import { isValidEmail } from '@/lib/utils';
import { Metadata } from 'next';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data - in a real app, this would come from props or context
  const personalInfo = {
    name: 'Amaud',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with expertise in modern web technologies',
    avatar: '/images/avatar.jpg',
    avatarAlt: 'Profile photo of Amaud',
    email: 'contact@amaud.dev',
    phone: '+1 (555) 123-4567',
    location: 'Your City, Country',
  };

  const socialLinks = [
    {
      platform: 'linkedin' as const,
      url: 'https://linkedin.com/in/yourprofile',
      icon: 'linkedin',
      label: 'LinkedIn',
      order: 1,
      enabled: true,
    },
    {
      platform: 'github' as const,
      url: 'https://github.com/yourusername',
      icon: 'github',
      label: 'GitHub',
      order: 2,
      enabled: true,
    },
    {
      platform: 'instagram' as const,
      url: 'https://instagram.com/yourusername',
      icon: 'instagram',
      label: 'Instagram',
      order: 3,
      enabled: true,
    },
  ];

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on projects, 
            or just chat about technology. Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 bg-background border-border text-foreground focus:border-accent"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 bg-background border-border text-foreground focus:border-accent"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1 bg-background border-border text-foreground focus:border-accent"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="mt-1 bg-background border-border text-foreground focus:border-accent"
                      placeholder="Tell me about your project or idea..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-muted-foreground text-sm">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-foreground hover:text-accent transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-muted-foreground text-sm">Phone</p>
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {personalInfo.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-muted-foreground text-sm">Location</p>
                      <p className="text-foreground">{personalInfo.location}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialLinks socialLinks={socialLinks} />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I typically respond to messages within 24 hours. For urgent matters, 
                  feel free to reach out via phone or social media.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
