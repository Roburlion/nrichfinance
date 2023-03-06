import Image from 'next/image';
import styles from './BrandBanner.module.css';
import image from './logo_banner.svg'

export default function App() {
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          alt="Logo Banner"
          src={image}
          fill
          style={{
            objectFit: 'fill',
          }}
          priority={true}
        />
      </div>
    </div>
  )
}