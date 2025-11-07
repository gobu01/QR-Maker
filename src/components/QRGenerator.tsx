import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const QRGenerator = () => {
  const [url, setUrl] = useState("https://example.com");
  const [qrCode, setQrCode] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState([300]);

  useEffect(() => {
    generateQR();
  }, [url, fgColor, bgColor, size]);

  const generateQR = async () => {
    try {
      const qr = await QRCode.toDataURL(url, {
        width: size[0],
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
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
    link.download = "qrcode.png";
    link.click();
    toast.success("QR code downloaded!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card className="p-6 space-y-6 glass-card shadow-soft hover:shadow-glow transition-smooth">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm font-medium">
            URL or Text
          </Label>
          <Input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL or text"
            className="transition-smooth focus:shadow-glow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fgColor" className="text-sm font-medium">
              Foreground Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="fgColor"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bgColor" className="text-sm font-medium">
              Background Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Size: {size[0]}px</Label>
          <Slider
            value={size}
            onValueChange={setSize}
            min={200}
            max={600}
            step={50}
            className="cursor-pointer"
          />
        </div>
      </Card>

      <Card className="p-6 flex flex-col items-center gap-6 glass-card shadow-soft hover:shadow-glow transition-smooth">
        <div className="bg-white p-4 rounded-lg shadow-soft">
          {qrCode && (
            <img src={qrCode} alt="QR Code" className="w-full h-auto" />
          )}
        </div>
        <Button
          onClick={downloadQR}
          className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-glow"
        >
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </Card>
    </div>
  );
};
