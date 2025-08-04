import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, Search, Image as ImageIcon } from "lucide-react";

export default function AiFinderPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [textPrompt, setTextPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const searchParts = async () => {
    if (!image && !textPrompt.trim()) {
      alert("Please upload an image or enter a description");
      return;
    }

    setLoading(true);
    // Mock AI search - replace with real AI API
    setTimeout(() => {
      setResults([
        {
          id: 1,
          name: "BMW E46 Headlight Assembly",
          confidence: 95,
          price: 1200,
          seller: "AutoParts Pro",
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&w=400&q=80",
          match: "Exact match - BMW 3 Series headlight"
        },
        {
          id: 2,
          name: "BMW Xenon Headlight (Compatible)",
          confidence: 87,
          price: 950,
          seller: "Parts Express",
          image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&w=400&q=80",
          match: "Similar part - Compatible model"
        },
        {
          id: 3,
          name: "BMW E46 OEM Headlight",
          confidence: 92,
          price: 1500,
          seller: "BMW Spares SA",
          image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&w=400&q=80",
          match: "OEM part - Perfect fit guaranteed"
        }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <ImageIcon size={32} />
              AI Part Finder
            </h1>
            <p className="text-muted-foreground">
              Upload a photo of the part you need or describe it, and our AI will find matching parts for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Upload Section */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Camera size={20} />
                Upload Part Image
              </h2>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Drag and drop an image or click to upload
                  </p>
                  <label className="bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 cursor-pointer">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports JPG, PNG, WebP up to 10MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Uploaded part"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <div className="flex gap-2">
                    <label className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 cursor-pointer text-center">
                      Change Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="px-4 py-2 border border-border rounded hover:bg-muted"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Text Description Section */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Search size={20} />
                Describe the Part
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Part Description (Optional)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe the part you're looking for... e.g., 'BMW 3 series headlight, left side, xenon type, for 2005 model'"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Tips for Better Results</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Include vehicle make, model, and year</li>
                    <li>• Mention specific part details (left/right, color, etc.)</li>
                    <li>• Take clear, well-lit photos from multiple angles</li>
                    <li>• Include any part numbers visible on the component</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center mb-8">
            <button
              onClick={searchParts}
              disabled={loading || (!image && !textPrompt.trim())}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto text-lg font-medium"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Find Matching Parts
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">AI Search Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/part/${result.id}`)}
                  >
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{result.name}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {result.confidence}% match
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{result.match}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          R{result.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {result.seller}
                        </span>
                      </div>
                      
                      <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/buy")}
                  className="border border-border px-6 py-2 rounded hover:bg-muted"
                >
                  Browse All Parts
                </button>
              </div>
            </div>
          )}

          {/* How It Works Section */}
          {results.length === 0 && (
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">How AI Part Finder Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload size={24} className="text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">1. Upload Image</h4>
                  <p className="text-sm text-muted-foreground">
                    Take a clear photo of the part you need or upload an existing image
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search size={24} className="text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">2. AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes the image and description to identify the part
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ImageIcon size={24} className="text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">3. Get Matches</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive ranked results with confidence scores and pricing
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}