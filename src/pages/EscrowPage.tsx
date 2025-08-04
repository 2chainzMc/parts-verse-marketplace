import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, Clock, AlertCircle, ArrowRight, CreditCard, Package, Truck, Users } from "lucide-react";

export default function EscrowPage() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: CreditCard,
      title: "Buyer Places Order",
      description: "Payment is securely held in escrow",
      status: "Funds are captured but not released to seller"
    },
    {
      icon: Users,
      title: "Warehouse Verification",
      description: "Internal team verifies part quality",
      status: "Quality assurance and authenticity check"
    },
    {
      icon: Package,
      title: "Seller Ships Part",
      description: "Seller is notified to ship the verified part",
      status: "Tracking information provided to buyer"
    },
    {
      icon: Truck,
      title: "Buyer Receives Part",
      description: "Buyer confirms receipt and condition",
      status: "Final approval before funds release"
    },
    {
      icon: CheckCircle,
      title: "Funds Released",
      description: "Payment is transferred to seller",
      status: "Transaction completed successfully"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield size={48} className="text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Secure Escrow Protection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Buy and sell car parts with confidence. Our escrow service ensures secure transactions 
              with quality verification and protection for both buyers and sellers.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">How Escrow Works</h2>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6 bg-card border rounded-lg p-6">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <step.icon size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Step {index + 1}: {step.title}</h3>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        {index === 0 ? "Start" : index === steps.length - 1 ? "Complete" : "Process"}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <p className="text-sm text-muted-foreground italic">{step.status}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-shrink-0">
                      <ArrowRight size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Shield className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Buyer Protection</h3>
              <p className="text-sm text-muted-foreground">
                Your money is held safely until you confirm the part meets your expectations
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Every part goes through our warehouse verification process before shipping
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Clock className="mx-auto h-12 w-12 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Auto-Release</h3>
              <p className="text-sm text-muted-foreground">
                Funds automatically release after 72 hours if no issues are reported
              </p>
            </div>
          </div>

          {/* Process Flow Diagram */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Transaction Flow</h2>
            <div className="text-center font-mono text-sm space-y-2">
              <div className="flex justify-center items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">BUYER</span>
              </div>
              <div>↓ (Order Part + Pay → Escrow Holds)</div>
              <div className="flex justify-center items-center">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded">ESCROW WALLET</span>
              </div>
              <div>↓ (Notify)</div>
              <div className="flex justify-center items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">WAREHOUSE DASHBOARD (QA/Approve Part)</span>
              </div>
              <div>↓ (Notify)</div>
              <div className="flex justify-center items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded">SELLER SHIPS</span>
              </div>
              <div>↓</div>
              <div className="flex justify-center items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">BUYER RECEIVES</span>
              </div>
              <div>↓ (Confirms Delivery)</div>
              <div className="flex justify-center items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded">ESCROW RELEASES FUNDS → SELLER</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-card border rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">For Buyers</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Funds held until part verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Quality guarantee through warehouse inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Full refund if part doesn't match description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Dispute resolution support</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">For Sellers</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Guaranteed payment upon delivery confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Protection against fraudulent buyers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>Automatic payment release after 72 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                    <span>No payment processing delays</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 mt-1" size={20} />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Important Information</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Escrow fees: 2.5% of transaction value (split between buyer and seller)</li>
                  <li>• Automatic fund release occurs after 72 hours if no disputes are raised</li>
                  <li>• Buyers have 48 hours to report issues after receiving the part</li>
                  <li>• Warehouse verification may add 1-2 business days to processing time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of buyers and sellers using our secure escrow service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/buy")}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 font-medium"
              >
                Browse Parts with Escrow
              </button>
              <button
                onClick={() => navigate("/sell")}
                className="border border-border px-8 py-3 rounded-lg hover:bg-muted font-medium"
              >
                Sell with Protection
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border border-border px-8 py-3 rounded-lg hover:bg-muted font-medium"
              >
                Have Questions?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}