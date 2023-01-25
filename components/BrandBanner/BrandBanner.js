import Image from 'next/image';
import style from './BrandBanner.module.css';
import image from './logo_banner.svg'

export default function App() {
  return (
    <div style={{ width: '100%', height: '500px', padding: '0 10%', backgroundColor: '#07305d' }}>
      <div style={{ position: 'relative', width: '100%', height: '500px' }}>
        <Image
          alt="Logo Banner"
          src={image}
          fill
          style={{
            objectFit: 'fill',
          }}
        />
      </div>
    </div>
  )
}