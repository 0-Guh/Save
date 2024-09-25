import "swiper/css"
import "./Global.css"

import Headerbar from "./components/Headerbar"
import Footerbar from "./components/Footerbar"


export const metadata = { title: "Home | Assista Filmes & Series" }

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Headerbar />
        {children}
        <Footerbar />
      </body>
    </html>
  )
}