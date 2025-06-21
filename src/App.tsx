import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { BlogPost } from './types/blog';
import { getPosts, getPost } from './posts';
import Navigation from './components/Navigation';
import BlogPostComponent from './components/BlogPost';
import SEO from './components/SEO';
import { Mail, MapPin, Phone, Heart, Globe, Clock, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const posts = getPosts();

  const handlePostClick = (post: BlogPost & { component: React.ComponentType }) => {
    navigate(`/post/${post.slug || post.id}`);
  };

  const handleBackToPosts = () => {
    navigate('/');
  };

  const HomePage = () => {
    const currentPost = location.pathname.startsWith('/post/') ? getPost(location.pathname.split('/post/')[1]) : null;
    
    return (
      <>
        <SEO 
          title="InvestIndia - Your Gateway to Indian Investment Opportunities"
          description="Discover the next generation of Indian investment opportunities. Expert insights on emerging sectors, market trends, and wealth creation strategies."
          posts={posts}
        />
        <main className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 transition-colors duration-200">
              Welcome to InvestIndia
            </h1>
            <p className="text-xl max-w-2xl mx-auto transition-colors duration-200">
              Your gateway to the next generation of Indian investment opportunities. 
              Discover emerging sectors, market trends, and wealth creation strategies.
            </p>
          </header>
          
          <section className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Heart className="h-16 w-16 mx-auto" />
                </div>
                <h2 className="text-lg font-medium mb-2">No posts yet</h2>
                <p>Check back soon for new content!</p>
              </div>
            ) : (
              posts
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                .map(post => (
                  <div key={post.id}>
                    <BlogPostComponent 
                      post={post} 
                      isPreview 
                      onClick={() => handlePostClick(post)}
                    />
                  </div>
                ))
            )}
          </section>
        </main>
      </>
    );
  };

  const PostPage = () => {
    const slug = location.pathname.split('/post/')[1];
    const post = getPost(slug);
    
    if (!post) {
      return (
        <>
          <SEO 
            title="Post Not Found - InvestIndia"
            description="The post you're looking for doesn't exist."
          />
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The post you're looking for doesn't exist.</p>
            <button
              onClick={handleBackToPosts}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Posts
            </button>
          </div>
        </>
      );
    }

    const PostComponent = post.component;
    
    return (
      <>
        <SEO 
          title={`${post.title} - InvestIndia`}
          description={post.metaDescription || post.excerpt}
          keywords={post.keywords}
          image={post.featuredImage}
          url={`https://investindia.com/post/${post.slug || post.id}`}
          type="article"
          post={post}
        />
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={handleBackToPosts}
              className="flex items-center space-x-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Posts</span>
            </button>
          </div>
          <PostComponent />
        </div>
      </>
    );
  };

  const AboutPage = () => (
    <>
      <SEO 
        title="About Us - InvestIndia"
        description="Learn more about InvestIndia and our mission to uncover investment opportunities in emerging sectors."
        keywords="about InvestIndia, investment firm, mission, Indian investment opportunities"
        url="https://investindia.com/about"
      />
      <main className="max-w-4xl mx-auto">
        <article className="rounded-xl shadow-sm border p-8 transition-colors duration-200">
          <h1 className="text-3xl font-bold mb-6">About InvestIndia</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              InvestIndia is your premier destination for discovering the next generation of Indian investment opportunities. 
              We believe that India's economic renaissance is creating unprecedented wealth creation potential across emerging sectors.
            </p>
            
            <p className="leading-relaxed mb-6">
              Our platform combines deep market research, expert analysis, and interactive tools to help you understand 
              and capitalize on the sectors that are shaping tomorrow's billionaires. From AI and renewable energy 
              to fintech and space technology, we provide comprehensive insights into India's most promising investment avenues.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="leading-relaxed mb-6">
              To democratize access to high-quality investment research and empower individuals to make informed 
              decisions about their financial future. We're committed to providing accurate, timely, and actionable 
              insights that help you navigate India's dynamic investment landscape.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-lg">
                <Target className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Sector Analysis</h3>
                <p>Deep dives into emerging sectors with interactive charts and metrics</p>
              </div>
              
              <div className="p-4 rounded-lg">
                <Users className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Expert Insights</h3>
                <p>Professional analysis and investment strategies</p>
              </div>
              
              <div className="p-4 rounded-lg">
                <Globe className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Market Trends</h3>
                <p>Stay updated with the latest market developments</p>
              </div>
              
              <div className="p-4 rounded-lg">
                <Clock className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Timely Updates</h3>
                <p>Regular content updates and market analysis</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-2">
              <li>• <strong>Accuracy:</strong> Research-backed insights and data-driven analysis</li>
              <li>• <strong>Transparency:</strong> Clear methodology and unbiased reporting</li>
              <li>• <strong>Accessibility:</strong> Complex topics made simple and understandable</li>
              <li>• <strong>Innovation:</strong> Cutting-edge tools and interactive experiences</li>
            </ul>
          </div>
        </article>
      </main>
    </>
  );

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateForm = () => {
      const newErrors: {[key: string]: string} = {};
      
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.subject.trim()) {
        newErrors.subject = 'Subject is required';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    };

    return (
      <>
        <SEO 
          title="Contact Us - InvestIndia"
          description="Have questions about Indian investment opportunities? Contact us for expert insights and research methodology information."
          keywords="contact InvestIndia, investment questions, Indian investment opportunities, research methodology"
          url="https://investindia.com/contact"
        />
        <main className="max-w-4xl mx-auto">
          <article className="rounded-xl shadow-sm border p-8 transition-colors duration-200">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Have questions about Indian investment opportunities? Want to learn more about our research methodology? 
                We'd love to hear from you. Send us a message below.
              </p>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      errors.subject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </article>
        </main>
      </>
    );
  };

  const PrivacyPage = () => (
    <>
      <SEO 
        title="Privacy Policy - InvestIndia"
        description="Learn about how InvestIndia collects, uses, and protects your personal information."
        keywords="privacy policy, data protection, personal information, InvestIndia privacy"
        url="https://investindia.com/privacy"
      />
      <main className="max-w-4xl mx-auto">
        <article className="rounded-xl shadow-sm border p-8 transition-colors duration-200">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm mb-6 text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or contact us. This may include your name, email address, 
              and any other information you choose to provide.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-6">
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and develop new features. We may also use your information 
              to send you updates about our services and investment opportunities.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information 
              with service providers who assist us in operating our website and providing our services.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="leading-relaxed mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="leading-relaxed mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="leading-relaxed mb-6">
              You have the right to access, update, or delete your personal information. You may also 
              opt out of receiving marketing communications from us at any time.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="leading-relaxed mb-6">
              If you have any questions about this Privacy Policy, please contact us through our 
              <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 ml-1">contact form</Link>.
            </p>
          </div>
        </article>
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;