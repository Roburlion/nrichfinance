import styles from './Styles.module.css'
import Image from 'next/image'
import image from './University-logos.jpg'

export default function App() {
  return (
    <div className={styles.wrapper}>
      <div>
        <Image src={image} alt='University logos' className={styles.image} />
      </div>
      <div className={styles.text}>
        <p>
          We support almost all American universities offering STEM degrees
        </p>
      </div>
    </div>
  )
}