import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Package, DollarSign, ShoppingCart, MessageSquare, Settings, Award } from "lucide-react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const mockListings = [
    {
      id: 1,
      image: "/placeholder.svg",
      name: "BMW 3 Series Brake Pads",
      price: "R450.00",
      status: "active",
      views: 45,
      inquiries: 3
    },
    {
      id: 2,
      image: "/placeholder.svg",
      name: "Mercedes C-Class Air Filter",
      price: "R280.00",
      status: "sold",
      views: 89,
      inquiries: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ninja-charcoal text-ninja-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🥷</div>
            <h1 className="text-xl font-bold">Car Part Ninja</h1>
            <Badge className="bg-yellow-500 text-black">
              <Award className="h-3 w-3 mr-1" />
              Verified Seller
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-ninja-red hover:bg-ninja-red/90 rounded-ninja">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="outline" className="border-ninja-white text-ninja-white hover:bg-white/10 rounded-ninja">
              Listings
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-ninja-red" />
              <div>
                <p className="text-2xl font-bold text-ninja-red">12</p>
                <p className="text-sm text-gray-600">Active Listings</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">Items Sold</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">R2,450</p>
                <p className="text-sm text-gray-600">Pending Payouts</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 rounded-ninja">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600">New Messages</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payout Section */}
        <Card className="mb-6 p-6 rounded-ninja">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Available Payout</h3>
              <p className="text-3xl font-bold text-ninja-red">R2,450.00</p>
              <p className="text-sm text-gray-600">From 3 completed sales</p>
            </div>
            <Button className="bg-ninja-red hover:bg-ninja-red/90 rounded-ninja">
              Request Payout
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Performance */}
              <Card className="p-6 rounded-ninja">
                <h3 className="text-lg font-semibold mb-4">Recent Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Profile Views</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Response Rate</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Customer Rating</span>
                      <span className="text-sm">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 rounded-ninja">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-ninja-white rounded-ninja">
                    <Plus className="h-6 w-6 mb-1" />
                    Add Part
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-ninja-white rounded-ninja">
                    <Package className="h-6 w-6 mb-1" />
                    View Orders
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-ninja-white rounded-ninja">
                    <MessageSquare className="h-6 w-6 mb-1" />
                    Messages
                  </Button>
                  <Button variant="outline" className="h-20 flex-col border-ninja-red text-ninja-red hover:bg-ninja-red hover:text-ninja-white rounded-ninja">
                    <DollarSign className="h-6 w-6 mb-1" />
                    Payouts
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Button className="bg-ninja-red hover:bg-ninja-red/90 rounded-ninja">
                <Plus className="h-4 w-4 mr-2" />
                Add New Part
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden rounded-ninja">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{listing.name}</h3>
                      <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                        {listing.status}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-ninja-red mb-2">{listing.price}</p>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{listing.views} views</span>
                      <span>{listing.inquiries} inquiries</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-semibold">Orders & Sales</h2>
            <Card className="p-6 rounded-ninja text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Orders</h3>
              <p className="text-gray-600">New orders will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Card className="p-6 rounded-ninja text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No New Messages</h3>
              <p className="text-gray-600">Customer inquiries will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-4">
            <h2 className="text-xl font-semibold">Payout History</h2>
            <Card className="p-6 rounded-ninja">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Available Balance</h3>
                  <p className="text-3xl font-bold text-ninja-red">R2,450.00</p>
                </div>
                <Button className="bg-ninja-red hover:bg-ninja-red/90 rounded-ninja">
                  Request Payout
                </Button>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">Minimum payout: R100.00</p>
                <p className="text-sm text-gray-600">Processing time: 1-3 business days</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <Card className="p-6 rounded-ninja">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <p className="text-gray-600">Auto Parts Pro</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <p className="text-gray-600">+27 82 123 4567</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <p className="text-gray-600">Johannesburg, Gauteng</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Verification Status</label>
                  <Badge className="bg-green-500">Verified Seller</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Navigation (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-ninja-white border-t md:hidden">
          <div className="grid grid-cols-5 p-2">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Package className="h-5 w-5" />
              <span className="text-xs">Listings</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">Orders</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-xs">Payouts</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}