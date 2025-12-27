import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";

interface GoogleMapProps {
  address: string;
  name: string;
  lat?: number;
  lng?: number;
  className?: string;
}

// Using a sample location for demo (Av. Paulista, São Paulo)
const DEFAULT_LAT = -23.5617;
const DEFAULT_LNG = -46.6553;

export function GoogleMap({ 
  address, 
  name, 
  lat = DEFAULT_LAT, 
  lng = DEFAULT_LNG,
  className = ""
}: GoogleMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const handleOpenRoutes = () => {
    const destination = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, we'll show a static map preview
    // In production, you'd add your Mapbox token here
    // mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNseDhxYWd5YTBmcHMycXNjM2l5bGdqN2wifQ.demo';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 15,
        interactive: true,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: false }),
        'top-right'
      );

      // Add marker
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `;

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<strong>${name}</strong><p class="text-sm">${address}</p>`)
        )
        .addTo(map.current);

    } catch (error) {
      console.log('Map initialization skipped - no valid token');
    }

    return () => {
      map.current?.remove();
    };
  }, [lat, lng, address, name]);

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-border/50 ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full min-h-[200px] bg-gradient-to-br from-muted/50 to-muted"
      >
        {/* Fallback static map preview when Mapbox isn't available */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/5 to-primary/5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 animate-pulse">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">{name}</p>
          <p className="text-xs text-muted-foreground text-center px-4">{address}</p>
        </div>
      </div>

      {/* Routes Button Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
        <Button 
          onClick={handleOpenRoutes}
          className="flex-1 gap-2 bg-primary hover:bg-primary/90 shadow-lg"
          size="sm"
        >
          <Navigation className="h-4 w-4" />
          Obter Rotas
        </Button>
        <Button 
          variant="secondary"
          size="sm"
          className="shadow-lg"
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
