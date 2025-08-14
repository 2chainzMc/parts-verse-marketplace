import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, Package } from "lucide-react";

export default function SellPartsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    partName: "",
    partType: "",
    condition: "",
    price: "",
    description: "",
    vin: "",
    make: "",
    model: "",
    year: "",
    images: [] as File[]
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    alert("Part listing submitted successfully!");
    navigate("/dashboard/seller");
  };

  const steps = [
    "Part Information",
    "Vehicle Details", 
    "Images & Description",
    "Pricing & Review"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Sell Your Car Part</h1>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center">{step}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            {/* Step 1: Part Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Part Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Part Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Front Brake Disc"
                      value={formData.partName}
                      onChange={(e) => setFormData({...formData, partName: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Part Type</label>
                    <select
                      value={formData.partType}
                      onChange={(e) => setFormData({...formData, partType: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Type</option>
                      <option value="engine">Engine</option>
                      <option value="body">Body</option>
                      <option value="interior">Interior</option>
                      <option value="electronics">Electronics</option>
                      <option value="suspension">Suspension</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Condition</option>
                      <option value="A">New (Grade A)</option>
                      <option value="B">Used - Good (Grade B)</option>
                      <option value="C">Used - Repairable (Grade C)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">VIN Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="Enter VIN for auto-detection"
                    value={formData.vin}
                    onChange={(e) => setFormData({...formData, vin: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                  />
                  <button 
                    type="button"
                    onClick={() => navigate("/vin")}
                    className="mt-2 text-primary hover:underline text-sm"
                  >
                    Use VIN Decoder →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. Toyota"
                      value={formData.make}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. Corolla"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2018"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Images & Description */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Images & Description</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Images</label>
                  <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">Drag and drop images or click to upload</p>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">
                      Choose Files
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">Max 5 images, up to 10MB each</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the part condition, any defects, installation notes, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Pricing & Review */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Pricing & Review</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (ZAR)</label>
                  <input
                    type="number"
                    placeholder="Enter price in Rands"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Listing Preview</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Part:</span> {formData.partName || "Not specified"}</p>
                    <p><span className="font-medium">Vehicle:</span> {formData.make} {formData.model} {formData.year}</p>
                    <p><span className="font-medium">Condition:</span> Grade {formData.condition}</p>
                    <p><span className="font-medium">Price:</span> R{formData.price || "0"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-2 border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 border rounded hover:bg-muted"
                >
                  Save Draft
                </button>
                {currentStep === 4 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Submit Listing
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}