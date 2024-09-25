export default function RenderPlayer({ DataMidia, searchParams }) {
    const { TmdbID, TitleFeatured, MyKyID, Genres } = DataMidia


    const isEPSE = searchParams.season && searchParams.episode


    function RenderMovie() {
        return <iframe className="w-full border-2 border-orange-500 aspect-video" src={`https://embedder.net/e/${TmdbID}`} allowFullScreen></iframe>
    }

    function RenderEPPage() {
        const seasonNumber = parseInt(searchParams.season);
        const episodeNumber = parseInt(searchParams.episode);

        // Verificar se é o último episódio da temporada
        const isLastEpisode = episodeNumber === Object.keys(DataMidia.Seasons[seasonNumber].Episode).length;
        const isFirstEpisode = episodeNumber === 1;

        // Verificar se há próxima temporada disponível
        const hasNextSeason = DataMidia.Seasons[seasonNumber + 1] !== undefined;
        const hasPreviousSeason = seasonNumber > 1;


        return (
            <div>
                <iframe className="w-full border-2 border-orange-500 aspect-video" src={`https://embedder.net/e/${TmdbID}/${seasonNumber}/${episodeNumber}`} allowFullScreen></iframe>
                <nav className="flex justify-between pt-8 pb-14">
                    <a href={isFirstEpisode ? (hasPreviousSeason ? `?season=${seasonNumber - 1}&episode=${Object.keys(DataMidia.Seasons[seasonNumber].Episode).length}` : null) : `?season=${seasonNumber}&episode=${episodeNumber - 1}`}>
                        <span className="material-icons bg-white px-8 py-1 rounded-md text-orange-500 !text-3xl !font-bold"> keyboard_double_arrow_left </span>
                    </a>
                    <a href={`/assistir/${MyKyID}`}>
                        <span className="material-icons bg-white text-orange-500 px-8 py-1 rounded-md !text-3xl !font-bold"> menu </span>
                    </a>
                    <a href={!isLastEpisode ? `?season=${seasonNumber}&episode=${episodeNumber + 1}` : hasNextSeason ? `?season=${seasonNumber + 1}&episode=1` : null}>
                        <span className="material-icons bg-white text-orange-500 px-8 py-1 rounded-md !text-3xl !font-bold"> keyboard_double_arrow_right </span>
                    </a>
                </nav>
            </div>
        );
    }

    function RenderSerie() {
        const seasonsObject = isEPSE ? { [searchParams.season]: DataMidia.Seasons[searchParams.season] } : DataMidia.Seasons;

        return (
            <div className="w-screen pt-5 max-w-6xl mx-auto px-5">
                {isEPSE ? <RenderEPPage /> : null}

                {isEPSE
                    ? <h5 className="mb-10 text-2xl text-center font-extrabold bg-orange-500 py-3 rounded-lg w-full block mt-10"> TEMPORADA {searchParams.season} </h5>
                    : <h5 className="mb-10 text-2xl text-center font-extrabold bg-orange-500 py-3 rounded-lg w-full block mt-10"> TEMPORADAS </h5>
                }


                {Object.keys(seasonsObject).map(seasonNumber => {
                    const season = DataMidia.Seasons[seasonNumber]

                    return (
                        <div key={seasonNumber} className="collapse bg-base-200 mb-10">
                            <input type="checkbox" defaultChecked={isEPSE ? true : false} />
                            <div className="collapse-title font-bold text-2xl flex">
                                <span> {season.SeasonTitle} </span>
                            </div>
                            <div className="collapse-content">
                                {Object.keys(season.Episode).map(episodeNumber => {
                                    const episode = season.Episode[episodeNumber];

                                    return (
                                        <a href={`/assistir/${MyKyID}?season=${seasonNumber}&episode=${episodeNumber}`} key={episodeNumber} className="flex mb-5 font-medium gap-x-5 cursor-pointer">
                                            <img className="bg-center bg-cover bg-no-repeat w-44 h-auto" src={`https://image.tmdb.org/t/p/original${episode.EpisodeImagePosterCard}`} alt={episode.EpisodeTitle} />
                                            <div>
                                                <h5>{episode.EpisodeTitle}</h5>
                                                <h5>{episode.EpisodeDuration}m</h5>
                                                <h5 className="mt-3 line-clamp-3 text-sm">{episode.EpisodePlot}</h5>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <main className="">

            <h1 className="text-2xl mb-14 mt-5 text-center"> <strong>  Assistir {TitleFeatured} {searchParams.season} x {searchParams.episode} em HD </strong> </h1>

            {Genres.includes("Filme") ? <RenderMovie /> : <RenderSerie />}

        </main>
    )
}