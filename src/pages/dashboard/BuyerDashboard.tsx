import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Shield, AlertTriangle, Car, User } from "lucide-react";

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("rfqs");

  const mockRFQs = [
    {
      id: 1,
      partName: "BMW 3 Series Brake Pads",
      vehicle: "2018 BMW 320i",
      status: "open",
      quotes: 3,
      dateCreated: "2024-01-15"
    },
    {
      id: 2,
      partName: "Toyota Corolla Headlight",
      vehicle: "2020 Toyota Corolla",
      status: "closed",
      quotes: 5,
      dateCreated: "2024-01-10"
    }
  ];

  const mockOrders = [
    {
      id: 1,
      partName: "Mercedes C-Class Air Filter",
      seller: "Auto Parts Pro",
      status: "shipped",
      escrowStatus: "held",
      total: "R450.00"
    },
    {
      id: 2,
      partName: "VW Golf Spark Plugs",
      seller: "Parts Direct",
      status: "delivered",
      escrowStatus: "released",
      total: "R280.00"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-ninja-charcoal text-ninja-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🥷</div>
            <h1 className="text-xl font-bold">Car Part Ninja</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-ninja-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-ninja-white hover:bg-white/10">
              <Package className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <Search className="h-8 w-8 text-ninja-red" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Active RFQs</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-ninja-red" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">Orders</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-ninja-red" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-600">In Escrow</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-ninja-red" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-600">Saved Vehicles</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="rfqs">My RFQs</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="escrow">Escrow Status</TabsTrigger>
            <TabsTrigger value="doa">DOA Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="rfqs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Request for Quotes</h2>
              <Button className="bg-ninja-red hover:bg-ninja-red/90 rounded-ninja">
                + New RFQ
              </Button>
            </div>
            
            {mockRFQs.map((rfq) => (
              <Card key={rfq.id} className="p-4 rounded-ninja">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{rfq.partName}</h3>
                    <p className="text-gray-600">{rfq.vehicle}</p>
                    <p className="text-sm text-gray-500">Created: {rfq.dateCreated}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={rfq.status === "open" ? "default" : "secondary"}>
                      {rfq.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{rfq.quotes} quotes</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-semibold">My Orders</h2>
            
            {mockOrders.map((order) => (
              <Card key={order.id} className="p-4 rounded-ninja">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{order.partName}</h3>
                    <p className="text-gray-600">Seller: {order.seller}</p>
                    <p className="font-semibold text-ninja-red">{order.total}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                      {order.status}
                    </Badge>
                    <Badge variant={order.escrowStatus === "held" ? "destructive" : "default"}>
                      Escrow: {order.escrowStatus}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="escrow" className="space-y-4">
            <h2 className="text-xl font-semibold">Escrow Status</h2>
            <Card className="p-6 rounded-ninja text-center">
              <Shield className="h-12 w-12 text-ninja-red mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Escrow Protection Active</h3>
              <p className="text-gray-600 mb-4">Your payments are safely held until delivery confirmation</p>
              <div className="text-2xl font-bold text-ninja-red">R730.00</div>
              <p className="text-sm text-gray-500">Total in escrow</p>
            </Card>
          </TabsContent>

          <TabsContent value="doa" className="space-y-4">
            <h2 className="text-xl font-semibold">DOA Requests</h2>
            <Card className="p-6 rounded-ninja text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No DOA Requests</h3>
              <p className="text-gray-600">You haven't submitted any Dead on Arrival claims</p>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <Card className="p-6 rounded-ninja">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-ninja-red rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-ninja-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">John Buyer</h3>
                  <p className="text-gray-600">john.buyer@email.com</p>
                  <Badge className="mt-1">Verified Buyer</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile Number</label>
                  <p className="text-gray-600">+27 82 123 4567</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <p className="text-gray-600">Johannesburg, Gauteng</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="mt-8 p-6 rounded-ninja bg-gradient-to-r from-ninja-red/10 to-ninja-red/5 border-ninja-red/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Want to sell parts too?</h3>
            <p className="text-gray-600 mb-4">Join thousands of sellers and start earning today</p>
            <Button variant="outline" className="border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-ninja-white rounded-ninja">
              Switch to Seller Panel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}