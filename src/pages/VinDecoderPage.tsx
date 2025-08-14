import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Car, Calendar, Cog, Info } from "lucide-react";

export default function VinDecoderPage() {
  const [vin, setVin] = useState("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const decodeVin = async () => {
    if (vin.length !== 17) {
      alert("VIN must be exactly 17 characters");
      return;
    }

    setLoading(true);
    // Mock API call - replace with real VIN decoder API
    setTimeout(() => {
      setDecodedData({
        make: "Toyota",
        model: "Corolla",
        year: "2018",
        engine: "1.8L 4-Cylinder",
        transmission: "CVT",
        trim: "LE",
        bodyType: "Sedan",
        fuelType: "Gasoline",
        drivetrain: "FWD",
        country: "Japan",
        manufacturer: "Toyota Motor Corporation"
      });
      setLoading(false);
    }, 1500);
  };

  const searchParts = () => {
    if (decodedData) {
      navigate(`/buy?make=${decodedData.make}&model=${decodedData.model}&year=${decodedData.year}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">VIN Decoder</h1>
            <p className="text-muted-foreground">
              Enter your Vehicle Identification Number (VIN) to get detailed vehicle information
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">VIN Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 17-character VIN (e.g. 1HGBH41JXMN109186)"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    maxLength={17}
                    className="flex-1 p-3 border rounded focus:ring-2 focus:ring-primary font-mono"
                  />
                  <button
                    onClick={decodeVin}
                    disabled={vin.length !== 17 || loading}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search size={18} />
                    )}
                    Decode VIN
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  VIN: {vin.length}/17 characters
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Info size={16} />
                  About VIN Numbers
                </h3>
                <p className="text-sm text-muted-foreground">
                  The Vehicle Identification Number (VIN) is a unique code assigned to every motor vehicle. 
                  It contains information about the manufacturer, model year, place of manufacture, and other vehicle details.
                </p>
              </div>
            </div>
          </div>

          {decodedData && (
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Car size={20} />
                Vehicle Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-muted-foreground">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Make:</span>
                      <span className="font-medium">{decodedData.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Model:</span>
                      <span className="font-medium">{decodedData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Year:</span>
                      <span className="font-medium">{decodedData.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trim:</span>
                      <span className="font-medium">{decodedData.trim}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-muted-foreground">Technical Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Engine:</span>
                      <span className="font-medium">{decodedData.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Transmission:</span>
                      <span className="font-medium">{decodedData.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Drivetrain:</span>
                      <span className="font-medium">{decodedData.drivetrain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fuel Type:</span>
                      <span className="font-medium">{decodedData.fuelType}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-muted-foreground">Manufacturing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Body Type:</span>
                      <span className="font-medium">{decodedData.bodyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Country:</span>
                      <span className="font-medium">{decodedData.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Manufacturer:</span>
                      <span className="font-medium text-xs">{decodedData.manufacturer}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">What's Next?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={searchParts}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 flex items-center justify-center gap-2"
                  >
                    <Search size={18} />
                    Find Compatible Parts
                  </button>
                  <button
                    onClick={() => navigate("/sell")}
                    className="border border-border px-6 py-3 rounded hover:bg-muted flex items-center justify-center gap-2"
                  >
                    <Cog size={18} />
                    Sell Parts for This Vehicle
                  </button>
                  <button
                    onClick={() => {
                      setVin("");
                      setDecodedData(null);
                    }}
                    className="border border-border px-6 py-3 rounded hover:bg-muted"
                  >
                    Decode Another VIN
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Need Help Finding Your VIN?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your VIN can typically be found on your dashboard (visible through windshield), 
                driver's side door jamb, or vehicle registration documents.
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="text-primary hover:underline text-sm"
              >
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}