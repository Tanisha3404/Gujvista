import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface DestinationMapProps {
  name: string
  latitude: number
  longitude: number
}

// A simple gold dot. Leaflet's default pin image breaks under Vite bundling,
// so we draw our own marker instead.
const markerIcon = divIcon({
  className: '',
  html: '<span class="block h-6 w-6 rounded-full border-4 border-white bg-accent shadow-lg"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

export default function DestinationMap({ name, latitude, longitude }: DestinationMapProps) {
  return (
    // "isolate" stops Leaflet's high z-index values from drawing over the sticky navbar.
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