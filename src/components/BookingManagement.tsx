import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, Clock, User, Phone, Mail, MessageSquare, 
  CheckCircle, XCircle, Loader2, RefreshCw, Filter,
  CalendarCheck, AlertCircle
} from 'lucide-react';
import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns';

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  booking_date: string;
  booking_time: string;
  purpose: string;
  message: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const BookingManagement = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
    
    const channel = supabase
      .channel('admin-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchBookings();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: true })
      .order('booking_time', { ascending: true });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Status Updated", description: `Booking marked as ${status}` });
    }
    setUpdatingId(null);
  };

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return ['pending', 'confirmed'].includes(b.status) && !isPast(parseISO(b.booking_date));
    }
    return b.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    today: bookings.filter(b => isToday(parseISO(b.booking_date)) && ['pending', 'confirmed'].includes(b.status)).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-charcoal-light/50 border-charcoal-medium">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <CalendarCheck className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-charcoal-light/50 border-charcoal-medium">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Today</p>
                <p className="text-2xl font-bold text-foreground">{stats.today}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-charcoal-light/50 border-charcoal-medium">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-charcoal-light/50 border-charcoal-medium">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-green-400">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-charcoal border-charcoal-medium text-foreground">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal border-charcoal-medium">
              <SelectItem value="all" className="text-foreground">All Bookings</SelectItem>
              <SelectItem value="upcoming" className="text-foreground">Upcoming</SelectItem>
              <SelectItem value="pending" className="text-foreground">Pending</SelectItem>
              <SelectItem value="confirmed" className="text-foreground">Confirmed</SelectItem>
              <SelectItem value="completed" className="text-foreground">Completed</SelectItem>
              <SelectItem value="cancelled" className="text-foreground">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchBookings}
          className="border-charcoal-medium text-foreground hover:bg-charcoal-medium"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card className="bg-charcoal-light/50 border-charcoal-medium border-dashed">
          <CardContent className="py-12 text-center">
            <CalendarCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Bookings Found</h3>
            <p className="text-muted-foreground">
              {filter !== 'all' ? 'Try changing the filter' : 'No appointments have been booked yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <Card 
              key={booking.id} 
              className={`bg-charcoal-light/50 border-charcoal-medium hover:border-primary/30 transition-colors ${
                isToday(parseISO(booking.booking_date)) ? 'ring-2 ring-primary/30' : ''
              }`}
            >
              <CardContent className="py-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {getDateLabel(booking.booking_date)}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.booking_time}
                      </span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-foreground">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-medium">{booking.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <a href={`tel:${booking.customer_phone}`} className="hover:text-primary transition-colors">
                          {booking.customer_phone}
                        </a>
                      </div>
                      {booking.customer_email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4 text-primary" />
                          <a href={`mailto:${booking.customer_email}`} className="hover:text-primary transition-colors">
                            {booking.customer_email}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span>{booking.purpose}</span>
                      </div>
                    </div>
                    
                    {booking.message && (
                      <p className="text-sm text-muted-foreground bg-charcoal/50 rounded-lg p-3 italic">
                        "{booking.message}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          disabled={updatingId === booking.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {updatingId === booking.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirm
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          disabled={updatingId === booking.id}
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(booking.id, 'completed')}
                        disabled={updatingId === booking.id}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {updatingId === booking.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Mark Complete'
                        )}
                      </Button>
                    )}
                    <a 
                      href={`https://wa.me/91${booking.customer_phone.replace(/\D/g, '')}?text=Hi ${booking.customer_name}, regarding your appointment on ${format(parseISO(booking.booking_date), 'MMM d')} at ${booking.booking_time}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/20 w-full">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
