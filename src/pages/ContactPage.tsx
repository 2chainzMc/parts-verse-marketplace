import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+27 11 123 4567",
      subtext: "Monday - Friday, 8AM - 6PM SAST",
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@allthingsparts.co.za",
      subtext: "We respond within 24 hours",
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Warehouse Location",
      details: "123 Industrial Ave, Johannesburg",
      subtext: "Parts inspection & distribution center",
      color: "text-orange-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-6PM SAST",
      subtext: "Sat: 9AM-2PM, Sun: Closed",
      color: "text-purple-600"
    }
  ];

  const supportTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "order", label: "Order Support" },
    { value: "escrow", label: "Escrow Questions" },
    { value: "technical", label: "Technical Issue" },
    { value: "seller", label: "Seller Support" },
    { value: "complaint", label: "Complaint" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Message Sent!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need help? Have questions? We're here to assist you with all your car parts needs.
            </p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 text-center">
                <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon size={24} className={info.color} />
                </div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                <p className="font-semibold mb-1">{info.details}</p>
                <p className="text-sm text-muted-foreground">{info.subtext}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare size={24} />
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Support Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                  >
                    {supportTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    placeholder="Please provide as much detail as possible to help us assist you better..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded hover:bg-primary/90 flex items-center justify-center gap-2 font-medium"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ and Additional Info */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/how-it-works")}
                    className="w-full text-left p-3 rounded border hover:bg-muted transition"
                  >
                    <div className="font-medium">How It Works</div>
                    <div className="text-sm text-muted-foreground">Learn about our platform</div>
                  </button>
                  <button
                    onClick={() => navigate("/escrow")}
                    className="w-full text-left p-3 rounded border hover:bg-muted transition"
                  >
                    <div className="font-medium">Escrow Protection</div>
                    <div className="text-sm text-muted-foreground">Understand our security features</div>
                  </button>
                  <button
                    onClick={() => navigate("/vin")}
                    className="w-full text-left p-3 rounded border hover:bg-muted transition"
                  >
                    <div className="font-medium">VIN Decoder</div>
                    <div className="text-sm text-muted-foreground">Find compatible parts</div>
                  </button>
                </div>
              </div>

              {/* Common Questions */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">How long does shipping take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Most orders ship within 2-3 business days after warehouse verification, 
                      with delivery in 3-7 business days depending on location.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">What if the part doesn't fit?</h4>
                    <p className="text-sm text-muted-foreground">
                      We offer a 48-hour return window for parts that don't match the description. 
                      Escrow protection ensures your payment is secure.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">How does escrow work?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your payment is held securely until you confirm the part meets expectations. 
                      Funds auto-release after 72 hours if no issues are reported.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Urgent Support</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  For urgent order issues or payment problems:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-yellow-600" />
                    <span className="font-semibold">+27 11 123 4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-yellow-600" />
                    <span className="font-semibold">urgent@allthingsparts.co.za</span>
                  </div>
                </div>
                <p className="text-xs text-yellow-600 mt-3">
                  Available 24/7 for critical order issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}