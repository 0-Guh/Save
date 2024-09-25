import CarouselCards from "./components/CarouselCards"
import CarouselSliders from "./components/CarouselSliders"



export default async function Initial() {
  const Response = await fetch("http://192.168.36.219:5000/getDataInitial/all", { cache: "no-store" })
  const Data = await Response.json()

  return (
    <main className="cursor-default">
      <CarouselSliders ItemsSlider={Data.slice(3000, 3020)} />

      <CarouselCards ItemsCard={Data.filter(_Item => _Item["ReleaseDate"]["Year"] >= 2024)} Title="Lançamentos" Route="/genres/all?year=2024" />

      <CarouselCards ItemsCard={Data.filter(_Item => _Item["Genres"].includes("Anime"))} Title="Animes" Route="/genres/anime" />
      <CarouselCards ItemsCard={Data.filter(_Item => _Item["Genres"].includes("Filme"))} Title="Filmes" Route="/genres/filme" />
      <CarouselCards ItemsCard={Data.filter(_Item => _Item["Genres"].includes("Serie"))} Title="Series" Route="/genres/serie" />

    </main>
  )
}