import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/products': 'Products',
  '/about': 'About Us',
  '/gallery': 'Gallery',
  '/booking': 'Booking',
  '/contact': 'Contact',
  '/inquiry': 'Inquiry Cart',
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      // Don't add link for the last item (current page)
      if (index === pathSegments.length - 1) {
        crumbs.push({ label });
      } else {
        crumbs.push({ label, path: currentPath });
      }
    });
    
    return crumbs;
  })();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
            )}
            {item.path ? (
              <Link
                to={item.path}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;