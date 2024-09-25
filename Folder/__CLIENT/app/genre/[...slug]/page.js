import Image from "next/image";

export const metadata = { title: "Home | Assista Filmes & Series" };

export default async function Genre({ params: { slug }, searchParams }) {
    const FormatSlug = slug.join("@").replaceAll(" ", "-");

    const Response = await fetch("http://192.168.36.219:5000/getDataInitial/" + FormatSlug, { cache: "no-store" });

    if (Response.status == 200) {
        const Data = await Response.json();
        const chunkedData = Array.from({ length: Math.ceil(Data.length / 50) }, (_, index) =>
            Data.slice(index * 50, (index + 1) * 50)
        );

        // Página atual
        const currentPage = parseInt(searchParams.page) || 0;

        // Total de páginas
        const totalPages = chunkedData.length;

        // Função para gerar os links de página
        const generatePageLinks = () => {
            const links = [];
            const minPage = Math.max(0, currentPage - 3);
            const maxPage = Math.min(totalPages - 1, currentPage + 3);

            for (let i = minPage - 1; i <= maxPage; i++) {
                links.push(
                    <a
                        key={i}
                        href={`?page=${i+1}`}
                        className={`join-item btn mx-5 !rounded-md !bg-orange-500 !text-white !font-bold ${i === currentPage ? 'active' : ''}`}
                    >
                        {i + 1}
                    </a>
                );
            }
            return links;
        };

        return (
            <main>
                <span className="pt-44 block bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 1) 100%), url(https://image.tmdb.org/t/p/original${Data[0].ImageBackground})` }}></span>

                <ul className="flex gap-x-1 font-bold ml-5 mt-10 text-xl 2xl:text-2xl 2xl:ml-10">
                    {slug.map((item, index) => (
                        <li key={index} className="hover:text-orange-500 hover:duration-500">
                            <a href={`/genre/${slug.slice(0, index + 1).join("/")}`}>{decodeURIComponent(item)} {index !== decodeURIComponent(item).length - 1 && ">"}</a>
                        </li>
                    ))}
                </ul>

                <span className="block mt-10 mb-8 text-2xl text-center"> Todos Resultados </span>

                <nav className="flex items-center justify-end pr-7 pb-5 pt-8">
                    <div className="join">
                        {generatePageLinks()}
                    </div>
                </nav>

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

                <nav className="flex items-center justify-end pr-7 pb-5 pt-8">
                    <div className="join">
                        {generatePageLinks()}
                    </div>
                </nav>
            </main>
        )
    } else {
        return (
            <main>
                <span className="pt-44 block bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 1) 100%)` }}></span>

                <ul className="flex gap-x-1 font-bold ml-5 mt-10 text-xl 2xl:text-2xl 2xl:ml-10">
                    {slug.map((item, index) => (
                        <li key={index} className="hover:text-orange-500 hover:duration-500">
                            <a href={`/genre/${slug.slice(0, index + 1).join("/")}`}>{decodeURIComponent(item)} {index !== decodeURIComponent(item).length - 1 && ">"}</a>
                        </li>
                    ))}
                </ul>

                <span className="block mt-10 mb-8 text-2xl text-center font-bold"> nenhum Resultado encontrado.. </span>
            </main>
        )
    }
}
