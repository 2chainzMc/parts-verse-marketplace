import { useNavigate } from "react-router-dom";
import { Search, Upload, ShoppingCart, Truck, CheckCircle, Users, Shield, Clock } from "lucide-react";

export default function HowItWorksPage() {
  const navigate = useNavigate();

  const buyingSteps = [
    {
      icon: Search,
      title: "Search for Parts",
      description: "Use our search filters or AI image recognition to find the exact part you need",
      details: ["Filter by make, model, year", "AI-powered image search", "VIN decoder integration"]
    },
    {
      icon: ShoppingCart,
      title: "Choose Escrow Protection",
      description: "Select secure escrow payment for verified parts and buyer protection",
      details: ["Funds held safely", "Quality verification", "Dispute protection"]
    },
    {
      icon: Shield,
      title: "Warehouse Verification",
      description: "Our team inspects the part for quality and authenticity before shipping",
      details: ["Professional inspection", "Condition verification", "Authenticity check"]
    },
    {
      icon: Truck,
      title: "Receive Your Part",
      description: "Get your verified part with tracking and confirm delivery to release funds",
      details: ["Tracked shipping", "Delivery confirmation", "72-hour protection period"]
    }
  ];

  const sellingSteps = [
    {
      icon: Upload,
      title: "List Your Part",
      description: "Upload photos and details of your car part using our guided form",
      details: ["Multi-step listing wizard", "Photo upload tools", "VIN integration"]
    },
    {
      icon: Users,
      title: "Verification Process",
      description: "Our warehouse team verifies your part meets quality standards",
      details: ["Quality assessment", "Condition grading", "Authenticity verification"]
    },
    {
      icon: CheckCircle,
      title: "Buyer Purchase",
      description: "When someone buys your part, funds are held in secure escrow",
      details: ["Guaranteed payment", "Buyer verification", "Secure transaction"]
    },
    {
      icon: Clock,
      title: "Ship & Get Paid",
      description: "Ship the part and receive payment once buyer confirms delivery",
      details: ["Shipping labels provided", "Automatic payment release", "Seller protection"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Escrow",
      description: "All transactions protected by secure escrow service with dispute resolution"
    },
    {
      icon: Search,
      title: "AI Part Finder",
      description: "Upload a photo and let AI identify the exact part you need"
    },
    {
      icon: Users,
      title: "Verified Sellers",
      description: "All sellers go through verification process for quality assurance"
    },
    {
      icon: Truck,
      title: "Tracked Shipping",
      description: "All orders include tracking and delivery confirmation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How Ruthless Auto Parts Works</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your complete guide to buying and selling car parts safely and securely through our platform
            </p>
          </div>

          {/* For Buyers Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">For Buyers</h2>
              <p className="text-muted-foreground">Find the perfect part with confidence and protection</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {buyingSteps.map((step, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-primary" />
                  </div>
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/buy")}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 font-medium"
              >
                Start Shopping for Parts
              </button>
            </div>
          </div>

          {/* For Sellers Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">For Sellers</h2>
              <p className="text-muted-foreground">Turn your spare parts into cash with our secure platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {sellingSteps.map((step, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-green-600" />
                  </div>
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/sell")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                Start Selling Your Parts
              </button>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-card border rounded-lg p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Flow */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Complete Transaction Flow</h2>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Search size={24} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Search & Find</span>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-orange-100 p-3 rounded-full mb-2">
                    <ShoppingCart size={24} className="text-orange-600" />
                  </div>
                  <span className="text-sm font-medium">Order & Pay</span>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <Shield size={24} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Verify Quality</span>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <Truck size={24} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Ship & Deliver</span>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Complete & Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold mb-2">How does escrow protection work?</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment is held securely until you confirm the part meets your expectations. 
                  Funds are automatically released after 72 hours if no issues are reported.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold mb-2">What if the part doesn't fit?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 48-hour return window for parts that don't match the description. 
                  Our warehouse verification helps minimize these issues.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold mb-2">How long does shipping take?</h3>
                <p className="text-sm text-muted-foreground">
                  Most parts ship within 2-3 business days after warehouse verification. 
                  Delivery times vary by location but typically 3-7 business days.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold mb-2">What are the fees?</h3>
                <p className="text-sm text-muted-foreground">
                  Escrow service fee is 2.5% of transaction value, split between buyer and seller. 
                  No hidden fees - what you see is what you pay.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers buying and selling car parts safely
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/buy")}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 font-medium"
              >
                Browse Parts
              </button>
              <button
                onClick={() => navigate("/sell")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                Sell Your Parts
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border border-border px-8 py-3 rounded-lg hover:bg-muted font-medium"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}