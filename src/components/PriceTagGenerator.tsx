import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Tag } from "lucide-react";
import { toast } from "sonner";

export const PriceTagGenerator = () => {
  const [productName, setProductName] = useState("Product Name");
  const [price, setPrice] = useState("99.99");
  const [currency, setCurrency] = useState("USD");
  const [sku, setSku] = useState("SKU-001");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    generatePriceQR();
  }, [productName, price, currency, sku]);

  const generatePriceQR = async () => {
    try {
      const priceData = JSON.stringify({
        product: productName,
        price: `${currency} ${price}`,
        sku: sku,
      });
      
      const qr = await QRCode.toDataURL(priceData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCode(qr);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `price-tag-${sku}.png`;
    link.click();
    toast.success("Price tag QR code downloaded!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card className="p-6 space-y-6 glass-card shadow-soft hover:shadow-glow transition-smooth">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Price Tag Information</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productName" className="text-sm font-medium">
            Product Name
          </Label>
          <Input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="transition-smooth focus:shadow-glow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="transition-smooth focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-sm font-medium">
              Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="transition-smooth focus:shadow-glow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD $</SelectItem>
                <SelectItem value="EUR">EUR €</SelectItem>
                <SelectItem value="GBP">GBP £</SelectItem>
                <SelectItem value="JPY">JPY ¥</SelectItem>
                <SelectItem value="INR">INR ₹</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku" className="text-sm font-medium">
            SKU / Product Code
          </Label>
          <Input
            id="sku"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Enter SKU"
            className="transition-smooth focus:shadow-glow"
          />
        </div>
      </Card>

      <Card className="p-6 flex flex-col items-center gap-6 glass-card shadow-soft hover:shadow-glow transition-smooth">
        <div className="bg-white p-4 rounded-lg shadow-soft">
          {qrCode && (
            <div className="text-center">
              <img src={qrCode} alt="Price Tag QR Code" className="w-full h-auto mb-4" />
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">{productName}</p>
                <p className="text-lg font-bold text-primary">{currency} {price}</p>
                <p className="text-xs text-gray-500">SKU: {sku}</p>
              </div>
            </div>
          )}
        </div>
        <Button
          onClick={downloadQR}
          className="w-full gradient-accent hover:opacity-90 transition-smooth shadow-glow"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Price Tag
        </Button>
      </Card>
    </div>
  );
};
