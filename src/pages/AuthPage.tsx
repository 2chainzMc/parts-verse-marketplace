import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Camera, User, CreditCard, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [step, setStep] = useState<"welcome" | "details" | "seller-extras" | "confirmation">("welcome");
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    acceptTerms: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelection = (type: "buyer" | "seller") => {
    setUserType(type);
    setStep("details");
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            mobile: formData.mobile,
            user_type: userType
          }
        }
      });

      if (error) throw error;

      if (userType === "seller") {
        setStep("seller-extras");
      } else {
        setStep("confirmation");
      }
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSellerExtrasSubmit = () => {
    setStep("confirmation");
  };

  const handleGoToDashboard = () => {
    if (userType === "buyer") {
      navigate("/dashboard/buyer");
    } else {
      navigate("/dashboard/seller");
    }
  };

  const NinjaConfetti = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="animate-bounce text-4xl">🥷</div>
    </div>
  );

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ninja-charcoal to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🥷</div>
            <h1 className="text-3xl font-bold text-ninja-white mb-2">
              Welcome to Car Part Ninja
            </h1>
            <p className="text-gray-400">
              Find the perfect parts for your ride
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={() => handleRoleSelection("buyer")}
              className="w-full bg-ninja-red hover:bg-ninja-red/90 text-ninja-white py-6 text-lg font-semibold rounded-ninja"
            >
              Continue as Buyer
            </Button>
            
            <Button
              onClick={() => handleRoleSelection("seller")}
              variant="outline"
              className="w-full border-ninja-red text-ninja-white hover:bg-ninja-red/10 py-6 text-lg font-semibold rounded-ninja"
            >
              Buy & Sell Parts
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")}
              className="text-ninja-white hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 rounded-ninja shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Basic Details</h2>
          
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
                className="rounded-ninja"
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
                className="rounded-ninja"
              />
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                required
                className="rounded-ninja flex-1"
              />
              <Button type="button" variant="outline" className="rounded-ninja border-ninja-red text-ninja-red">
                OTP
              </Button>
            </div>
            
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="rounded-ninja focus:ring-ninja-red focus:border-ninja-red"
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className="rounded-ninja focus:ring-ninja-red focus:border-ninja-red"
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
                className="border-ninja-red data-[state=checked]:bg-ninja-red"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-ninja-red hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ninja-red hover:bg-ninja-red/90 text-ninja-white py-3 font-bold rounded-ninja"
            >
              {loading ? "Creating Account..." : "Continue"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (step === "seller-extras") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-6 rounded-ninja shadow-lg">
          <div className="mb-6">
            <Progress value={75} className="mb-2" />
            <p className="text-sm text-gray-600">Step 3 of 4</p>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Seller Verification</h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-ninja-red" />
                Upload ID Document
              </h3>
              <div className="border-2 border-dashed border-ninja-red rounded-ninja p-6 text-center hover:bg-ninja-red/5 transition-colors">
                <Upload className="h-8 w-8 text-ninja-red mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Camera className="h-5 w-5 text-ninja-red" />
                Selfie with ID
              </h3>
              <div className="border-2 border-dashed border-ninja-red rounded-ninja p-6 text-center hover:bg-ninja-red/5 transition-colors">
                <Camera className="h-8 w-8 text-ninja-red mx-auto mb-2" />
                <p className="text-sm text-gray-600">Take a selfie holding your ID</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-ninja-red" />
                Payout Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payout" className="accent-ninja-red" />
                  <span>Bank Account</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payout" className="accent-ninja-red" />
                  <span>PayPal</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-ninja-red" />
                Location
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <select className="border rounded-ninja p-2">
                  <option>Select Province</option>
                  <option>Gauteng</option>
                  <option>Western Cape</option>
                  <option>KwaZulu-Natal</option>
                </select>
                <select className="border rounded-ninja p-2">
                  <option>Select City</option>
                  <option>Johannesburg</option>
                  <option>Cape Town</option>
                  <option>Durban</option>
                </select>
              </div>
            </div>
            
            <Button
              onClick={handleSellerExtrasSubmit}
              className="w-full bg-ninja-red hover:bg-ninja-red/90 text-ninja-white py-3 font-bold rounded-ninja"
            >
              Submit for Verification
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ninja-charcoal to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center relative">
          <NinjaConfetti />
          
          <div className="mb-8">
            <div className="text-6xl mb-4">🥷✨</div>
            <h1 className="text-3xl font-bold text-ninja-red mb-2">
              Account Created!
            </h1>
            {userType === "seller" ? (
              <p className="text-gray-400">
                Your account is awaiting verification. You'll receive an email once approved.
              </p>
            ) : (
              <p className="text-gray-400">
                Welcome to Car Part Ninja! Start finding parts now.
              </p>
            )}
          </div>
          
          <Button
            onClick={handleGoToDashboard}
            className="w-full bg-ninja-red hover:bg-ninja-red/90 text-ninja-white py-6 text-lg font-semibold rounded-ninja"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
}