"use client"
import Image from "next/image"

import { EffectCoverflow, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


export default function CarouselSliders({ ItemsSlider }) {
    return (
        <Swiper loop={true} effect="coverflow" autoplay={{ delay: 5000, pauseOnMouseEnter: true }} modules={[EffectCoverflow, Autoplay]}>

            {ItemsSlider.map(_Item => {
                const { MyKyID, TmdbID, ImdbID, TitleFeatured, TitleOriginal, ImagePosterCard, ImageBackground, Plot, Genres, Duration, AgeRating, ReleaseDate } = _Item

                const UrlImagePosterCard = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + ImagePosterCard
                const UrlImageBackground = "https://image.tmdb.org/t/p/original" + ImageBackground

                const LinearGradientBack = { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 1) 100%), url(${UrlImageBackground})` }

                const Href = `/assistir/${MyKyID}`

                return (
                    <SwiperSlide key={MyKyID}>

                        <article className="bg-cover bg-center min-h-[70vh] px-5 pt-48 flex flex-col items-center md:flex-row md:items-start md:pl-20" style={LinearGradientBack}>

                            <div className="relative">

                                <Image className="rounded-lg w-56 md:w-64 2xl:w-80" src={UrlImagePosterCard} alt={TitleFeatured} priority={true} quality={100} width={224} height={0} />

                            </div>

                            <section className="text-center my-10 max-w-xl md:text-start md:ml-5 md:my-0 2xl:ml-10">

                                <h2>
                                    <span className="font-bold text-2xl"> {TitleFeatured} </span>

                                    <span className="font-medium text-lg text-orange-500"> {ReleaseDate["Year"]} </span>
                                </h2>

                                <h1>
                                    <span className="font-medium text-lg"> {TitleOriginal} </span>
                                </h1>

                                <nav className="flex flex-wrap justify-center gap-5 py-10 md:justify-start">

                                    {Genres.map(_Genre => <a key={_Genre + MyKyID} href={`/genres/${_Genre.toLowerCase()}`} className="bg-orange-500 px-4 py-2 rounded-full font-bold hover:duration-150 hover:scale-110"> {_Genre} </a>)}

                                </nav>

                                <h3 className="line-clamp-5 font-medium text-lg mb-14">{Plot}</h3>

                                <a className="inline-flex px-14 py-3 font-bold rounded-lg text-orange-500 bg-white hover:duration-200 hover:shadow-lg hover:shadow-orange-500" href={Href}> Assistir </a>


                            </section>

                        </article>

                    </SwiperSlide>
                )
            })}

        </Swiper>
    )
}


{/* <span className={`absolute top-0 right-0 px-5 py-1 font-medium text-lg ${AgeRating >= 18 ? "bg-black" : AgeRating >= 15 ? "bg-red-500" : AgeRating >= 5 ? "bg-orange-500" : "bg-green-500"}`}>+{AgeRating}</span> */ }