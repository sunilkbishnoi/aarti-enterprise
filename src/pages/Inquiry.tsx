import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, Mail, ArrowLeft, Loader2, Check } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInquiry } from '@/context/InquiryContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Inquiry = () => {
  const { items, removeItem, updateQuantity, clearInquiry, getWhatsAppMessage } = useInquiry();
  const { toast } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendEmail = async () => {
    if (!customerName || customerName.length < 2) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!customerPhone || customerPhone.length < 10) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-inquiry-email', {
        body: {
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          items: items.map(item => ({
            productName: item.productName,
            grade: item.grade,
            size: item.size,
            thickness: item.thickness,
            quantity: item.quantity,
            price: item.price,
          })),
          total_value: totalValue,
        },
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: "Inquiry Sent Successfully!",
        description: `Confirmation sent to ${customerEmail}. Inquiry ID: ${data?.inquiry_id || 'N/A'}`,
      });
    } catch (err: any) {
      console.error('Inquiry email error:', err);
      toast({
        title: "Failed to send inquiry",
        description: "Please try again or use WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Inquiry Cart - AARTI ENTERPRISE</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <TopBar />
          <Header />
          <main className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-4">Your Inquiry List is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Add products to your inquiry list to request quotations from us.
              </p>
              <Link to="/products">
                <Button className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Inquiry Cart (${items.length} items) - AARTI ENTERPRISE`}</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopBar />
        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Inquiry Cart</h1>
              <p className="text-muted-foreground">{items.length} items in your inquiry list</p>
            </div>
            <Button variant="ghost" onClick={clearInquiry} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.grade}-${item.size}-${item.thickness}`}
                  className="bg-card rounded-xl border border-border p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{item.productName}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                        <span className="bg-muted px-2 py-1 rounded">Grade: {item.grade}</span>
                        <span className="bg-muted px-2 py-1 rounded">Size: {item.size}</span>
                        <span className="bg-muted px-2 py-1 rounded">Thickness: {item.thickness}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.grade, item.size, item.thickness, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.grade, item.size, item.thickness, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.productId, item.grade, item.size, item.thickness)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString('en-IN')}/pc</p>
                      <p className="text-lg font-bold text-primary">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h3 className="font-display text-xl font-bold mb-6">Inquiry Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Pieces</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-medium">Estimated Value</span>
                    <span className="text-xl font-bold text-primary">₹{totalValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-6">
                  * This is an approximate value. Final quotation will be provided based on current rates.
                </p>

                {/* Customer Details for Email */}
                <div className="space-y-3 mb-6 border-t border-border pt-6">
                  <h4 className="font-medium text-sm text-foreground">Your Details (for email confirmation)</h4>
                  <div>
                    <Label htmlFor="inq-name" className="text-xs text-muted-foreground">Name *</Label>
                    <Input
                      id="inq-name"
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      maxLength={100}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inq-phone" className="text-xs text-muted-foreground">Phone *</Label>
                    <Input
                      id="inq-phone"
                      placeholder="Your phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      maxLength={15}
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inq-email" className="text-xs text-muted-foreground">Email *</Label>
                    <Input
                      id="inq-email"
                      type="email"
                      placeholder="Your email address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      maxLength={255}
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/919427055205?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 h-12 text-base bg-[#25D366] hover:bg-[#128C7E] text-white">
                      <MessageCircle className="w-5 h-5" />
                      Send on WhatsApp
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    className={`w-full gap-2 h-12 text-base ${
                      emailSent
                        ? 'border-green-500 bg-green-500 text-white hover:bg-green-600'
                        : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={handleSendEmail}
                    disabled={isSending || emailSent}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <Check className="w-5 h-5" />
                        Inquiry Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Send Email
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Need help?</p>
                  <a href="tel:+919427055205" className="text-primary font-medium hover:underline">
                    Call +91 94270 55205
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Inquiry;
