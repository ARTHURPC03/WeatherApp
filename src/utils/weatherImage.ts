import Image01d from '../assets/Weather/01d/01d.png'
import Image01n from '../assets/Weather/01n/01n.png'
import Image09d from '../assets/Weather/09d/09d.png'
import Image09n from '../assets/Weather/09n/09n.png'
import Image10d from '../assets/Weather/10d/10d.png'
import Image10n from '../assets/Weather/10n/10n.png'
import Image11d from '../assets/Weather/11d/11d.png'
import Image11n from '../assets/Weather/11n/11n.png'
import Image13d from '../assets/Weather/13d/13d.png'
import Image13n from '../assets/Weather/13n/13n.png'
import Image0203d from '../assets/Weather/0203d/0203d.png'
import Image0203n from '../assets/Weather/0203n/0203n.png'
import Image0450 from '../assets/Weather/0450/0450.png'

export default function weatherImage(iconId: string) {
  switch (iconId) {
    case '01d':
      return Image01d
    case '01n':
      return Image01n
    case '02d':
      return Image0203d
    case '02n':
      return Image0203n
    case '03d':
      return Image0203d
    case '03n':
      return Image0203n
    case '04d':
      return Image0450
    case '04n':
      return Image0450
    case '09d':
      return Image09d
    case '09n':
      return Image09n
    case '10d':
      return Image10d
    case '10n':
      return Image10n
    case '11d':
      return Image11d
    case '11n':
      return Image11n
    case '13d':
      return Image13d
    case '13n':
      return Image13n
    case '50d':
      return Image0450
    case '50n':
      return Image0450

    default:
      break
  }
}
