import RenderPlayer from "@/app/components/RenderPlayer"
import CarouselSliders from "@/app/components/CarouselSliders"


export default async function Assistir({ searchParams, params: { slug } }) {


    const Response = await fetch(`http://192.168.36.219:5000/getDataMyKyID/${slug[0]}`)
    var CurrentMidia = await Response.json()

    const { season, episode } = searchParams


    if (season && episode) {
        const DataEp = CurrentMidia.Seasons[season].Episode[episode]

        CurrentMidia = {
            "Status": CurrentMidia["Status"],
            "MyKyID": CurrentMidia["MyKyID"],
            "ImdbID": CurrentMidia["ImdbID"],
            "TmdbID": CurrentMidia["TmdbID"],

            "TitleFeatured": CurrentMidia["TitleFeatured"],
            "EpisodeTitle": DataEp["EpisodeTitle"],
            "TitleOriginal": CurrentMidia["TitleOriginal"],

            "ImagePosterCard": DataEp["EpisodeImagePosterCard"],
            "ImageBackground": CurrentMidia["ImageBackground"],

            "Plot": DataEp["EpisodePlot"],
            "EpisodePlot": DataEp["EpisodePlot"],
            "Genres": CurrentMidia["Genres"],
            "Finished": CurrentMidia["Finished"],
            "AgeRating": CurrentMidia["AgeRating"],
            "ReleaseDate": CurrentMidia["ReleaseDate"],
            "Duration": DataEp["EpisodeDuration"],
            "Seasons": CurrentMidia["Seasons"]
        }
    }


    return (
        <main>

            <CarouselSliders ItemsSlider={[CurrentMidia]} AddExtra={season && episode ? <h1 className="pt-4 font-medium text-xl">Duração: {CurrentMidia["Duration"]}m</h1> : null} />

            <RenderPlayer DataMidia={CurrentMidia} searchParams={searchParams} />

        </main>
    )
}