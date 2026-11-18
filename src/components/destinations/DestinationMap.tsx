import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface DestinationMapProps {
  name: string
  latitude: number
  longitude: number
}

// custom marker icon to match the design of the site
const markerIcon = divIcon({
  className: '',
  html: '<span class="block h-6 w-6 rounded-full border-4 border-white bg-accent shadow-lg"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default function DestinationMap({ name, latitude, longitude }: DestinationMapProps) {
  return (
    /* The map is wrapped in a div with a fixed height to ensure it displays correctly. 
    The MapContainer component from react-leaflet is used to render the map, centered on the provided latitude and longitude. 
    A TileLayer is added to display the map tiles from OpenStreetMap & a Marker is placed at the destination's coordinates with a custom icon */
    <div className="isolate h-80 overflow-hidden rounded-2xl border border-white/10 sm:h-96">
      <MapContainer
        center={[latitude, longitude]}
        zoom={11}
        scrollWheelZoom={false} // so scrolling the page doesn't get stuck on the map
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon} title={name} />
      </MapContainer>
    </div>
  )
}