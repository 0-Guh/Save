"use client"
import Image from "next/image"

import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"


export default function CarouselCards({ ItemsCard, Title, Route }) {
    return (
        <article>

            <nav className="flex justify-between font-medium px-5 py-10">

                <h2 className="text-2xl md:text-3xl"> {Title} </h2>

                <a href={Route} className="bg-orange-500 px-5 py-1 rounded-md hover:scale-110 hover:duration-300"> Ver Tudo {ItemsCard.length} </a>

            </nav>

            <Swiper slidesPerView="auto" autoplay={{ delay: 5000, pauseOnMouseEnter: true }} modules={[Autoplay]}>

                {ItemsCard.slice(0, 10).map(_Item => {
                    const { MyKyID, TmdbID, ImdbID, TitleFeatured, TitleOriginal, ImagePosterCard, ImageBackground, Plot, Genres, Duration, Finished, AgeRating, ReleaseDate } = _Item

                    const UrlImagePosterCard = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + ImagePosterCard

                    const Href = "/assistir/" + MyKyID

                    return (
                        <SwiperSlide key={MyKyID} className="!mx-5 !w-[30vw] md:!w-[20vw] lg:!w-[15vw] xl:!w-[10vw]">

                            <a href={Href} className="block overflow-hidden">

                                <span className="absolute z-10 bg-orange-500 font-medium px-5 py-2 md:py-1"> {ReleaseDate["Year"]} </span>

                                <Image className="rounded-lg hover:scale-110 hover:duration-300" src={UrlImagePosterCard} alt={TitleFeatured} loading="lazy" quality={100} width={224} height={0} />

                                <h2 className="font-semibold text-center line-clamp-2 mt-2"> {TitleFeatured} </h2>

                            </a>

                        </SwiperSlide>
                    )
                })}

            </Swiper>

        </article>
    )
}