import Image from "next/image"



export function generateMetadata({ searchParams, params: { slug } }) {
    const FormatSlug = slug.map(_Slug => _Slug.trim().toLowerCase().replace(/\b\w/g, _Char => _Char.toUpperCase()))

    return { title: `Assistir | ${FormatSlug.join(" | ")} | Page ${Math.max(searchParams.page || 1, 1)}` }
}

export default async function Genres({ searchParams, params: { slug } }) {
    const FormatSlug = slug.join("@").replaceAll(" ", "-")
    const getYearParams = searchParams.year

    const Response = await fetch("http://192.168.36.219:5000/getDataInitial/" + FormatSlug + "?year=" + getYearParams, { cache: "no-store" })


    if (Response.status == 200) {
        const Data = await Response.json()

        const chunkedData = Data.reduce((_Acc, _Item, _Index) => {
            const Page = Math.floor(_Index / 50) + 1

            _Acc[Page] = _Acc[Page] || []
            _Acc[Page].push(_Item)
            return _Acc
        }, {})

        const currentPage = Math.max(Math.min(parseInt(searchParams.page) || 1, Object.keys(chunkedData).length), 1)

        const UrlImageBackground = "https://image.tmdb.org/t/p/original" + chunkedData[currentPage][0]?.ImageBackground
        const LinearGradientBack = { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 1) 100%), url(${UrlImageBackground})` }

        function Pagination() {
            return (
                <nav className="flex items-center justify-end mr-10 mb-5 font-bold text-xl text-orange-500">

                    <a href={currentPage > 1 ? `?page=${currentPage - 1}` : null} className="font-[Icon] px-5 py-1 rounded-md bg-white"> arrow_back </a>

                    <span className="mx-2 px-5 py-1 rounded-md bg-white"> {currentPage} </span>

                    <a href={chunkedData[currentPage + 1] ? `?page=${currentPage + 1}` : null} className="font-[Icon] px-5 py-1 rounded-md bg-white"> arrow_forward </a>

                </nav>
            )
        }

        return (
            <main className="cursor-default">
                <div className="pt-48 bg-cover bg-center" style={LinearGradientBack} />

                <span className="block my-10 text-2xl text-center"> Todos Resultados </span>

                <Pagination />

                <section className="flex flex-wrap justify-center">
                    {chunkedData[currentPage]?.map(_Item => {
                        const { MyKyID, TitleFeatured, ReleaseDate, ImagePosterCard } = _Item

                        const UrlImagePosterCard = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + ImagePosterCard
                        const Href = `/assistir/${MyKyID}`

                        return (
                            <article key={MyKyID} className="!mx-2 !w-[28vw] md:!w-[20vw] lg:!w-[15vw] xl:!w-[10vw] mb-10">
                                <a href={Href} className="block overflow-hidden">
                                    <span className="absolute z-10 bg-orange-500 font-bold px-5 py-2 md:py-1"> {ReleaseDate["Year"]} </span>
                                    <Image className="rounded-lg w-full hover:scale-110 hover:duration-300" src={UrlImagePosterCard} alt={TitleFeatured} loading="lazy" quality={100} width={224} height={0} />
                                    <h2 className="line-clamp-2 mt-2 font-semibold"> {TitleFeatured} </h2>
                                </a>
                            </article>
                        )
                    }) ?? <h1 className="font-bold text-2xl py-14"> Sem mais Resultados </h1>}
                </section>

                <Pagination />
            </main>
        )
    }

    if (Response.status != 200) {
        return (
            <main className="cursor-default pt-44">

                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />

                <div className="w-96 h-96 mx-auto my-12">

                    <a className="flex items-center gap-x-2 font-bold text-xl text-white hover:duration-150 hover:text-orange-500" href="javascript:history.back()">

                        <span className="font-[Icon]">arrow_back</span>

                        <span>Voltar</span>

                    </a>

                    <lottie-player loop autoplay src="https://lottie.host/9d467775-6209-4e3f-8879-07131601e21c/rQfOw5AVvY.json" style={{ width: "100%", height: "100%" }} />

                    <p className="font-bold text-2xl"> Nenhum resultado encontrado </p>

                </div>

            </main>
        )
    }
}
