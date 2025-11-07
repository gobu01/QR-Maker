import { QrCode, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRGenerator } from "@/components/QRGenerator";
import { PriceTagGenerator } from "@/components/PriceTagGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-hero shadow-glow">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QR Maker
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Create Beautiful QR Codes
          </h2>
          <p className="text-lg text-muted-foreground">
            Generate customizable QR codes for links and price tags. Personalize colors, adjust sizes, and download instantly.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 shadow-soft">
            <TabsTrigger value="general" className="transition-smooth">
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="price" className="transition-smooth">
              <Tag className="mr-2 h-4 w-4" />
              Price Tag
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-8">
            <QRGenerator />
          </TabsContent>

          <TabsContent value="price" className="mt-8">
            <PriceTagGenerator />
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Create unlimited QR codes with full customization. Free to use, no sign-up required.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
