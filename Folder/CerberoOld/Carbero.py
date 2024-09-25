#! /usr/bin/env python3

import concurrent.futures as isFuturesThread
import requests_tor as isRequestsTor
import colorama as isColor
import string as isString
import random as isRandom
import json as isJson



def RequestUrlInTor(Request_URL, Request_Headers):
    RequestTOR = isRequestsTor.RequestsTor()
    
    while True:
        try:
            Response = RequestTOR.get(url=Request_URL, headers=Request_Headers)
            Code = Response.status_code
        except: 
            Code = 500

        if Code == 429: RequestTOR.new_id()
        if Code == 200: return Response, True
        if Code == 404: return Response, False

def PullData(Current_Data):
    ResponseDetailsTMDB, StatusDetailsTMDB = RequestUrlInTor(f"https://api.themoviedb.org/3/tv/{Current_Data["TmdbID"]}?language=pt-BR&api_key=dba81583a54edf2ec798b59bc39cc8d9", {})
    JsonDetailsTMDB = ResponseDetailsTMDB.json()

    ResponseRatingTMDB, StatusRatingTMDB = RequestUrlInTor(f"https://api.themoviedb.org/3/tv/{Current_Data["TmdbID"]}/content_ratings?language=pt-BR&api_key=dba81583a54edf2ec798b59bc39cc8d9", {})
    JsonRatingTMDB = ResponseRatingTMDB.json()["results"]


    MyKyID = "".join(isRandom.choices(isString.ascii_letters, k=30))
    ImdbID = Current_Data["ImdbID"]
    TmdbID = Current_Data["TmdbID"]

    TitleFeatured = JsonDetailsTMDB.get("name", "N/A")
    TitleOriginal = JsonDetailsTMDB.get("original_name", "N/A")

    ImagePosterCard = JsonDetailsTMDB.get("poster_path", "N/A")
    ImageBackground = JsonDetailsTMDB.get("backdrop_path", "N/A")

    Plot = JsonDetailsTMDB.get("overview", "N/A")

    Genres = "#".join([ Genre["name"] for Genre in JsonDetailsTMDB["genres"]])

    Finished = JsonDetailsTMDB.get("status", "N/A")

    AgeRating = next((Age["rating"] for Age in JsonRatingTMDB if Age["iso_3166_1"] == "BR"), "N/A")

    ReleaseDate = JsonDetailsTMDB.get("first_air_date", "N/A")


    Seasons = {}
    SeasonNumber = 1 

    for __, _SeasonItens in Current_Data["Seasons"].items():
        ResponseDetailsSeason, StatusDetailsSeason = RequestUrlInTor(f"https://api.themoviedb.org/3/tv/{Current_Data["TmdbID"]}/season/{SeasonNumber}?language=pt-BR&api_key=dba81583a54edf2ec798b59bc39cc8d9", {})
        JsonDetailsSeason = ResponseDetailsSeason.json()

        SeasonTitle = f"{SeasonNumber}ª Temporada"

        SeasonImagePosterCard = JsonDetailsSeason.get("poster_path", "N/A")

        EpisodesData = {}
        EpisodeNumber = 1

        for _Episode in _SeasonItens:
            if StatusDetailsSeason:
                ResponseDetailsEpisode, StatusDetailsEpisodeo = RequestUrlInTor(f" https://api.themoviedb.org/3/tv/{Current_Data["TmdbID"]}/season/{SeasonNumber}/episode/{EpisodeNumber}?language=pt-BR&api_key=dba81583a54edf2ec798b59bc39cc8d9", {})
                JsonDetailsEpisode = ResponseDetailsEpisode.json()

                EpisodeTitle = JsonDetailsEpisode.get("name", "N/A")
                EpisodePlot = JsonDetailsEpisode.get("overview", "N/A")
                EpisodeDuration = JsonDetailsEpisode.get("runtime", "N/A")
                EpisodeImagePosterCard = JsonDetailsEpisode.get("still_path", "N/A")


                EpisodesData[_Episode[0]] = {
                    "EpisodeStatus": True,
                    "EpisodeTitle": EpisodeTitle,
                    "EpisodePlot": EpisodePlot,
                    "EpisodeDuration": EpisodeDuration,
                    "EpisodeImagePosterCard": EpisodeImagePosterCard
                }

            else:
                EpisodesData[_Episode[0]] = {
                    "EpisodeTitle": "N/A",
                    "EpisodePlot": "N/A",
                    "EpisodeDuration": "N/A",
                    "EpisodeImagePosterCard": "N/A"
                }


            EpisodeNumber += 1
        
        Seasons[SeasonNumber] = {
            "SeasonStatus": True,
            "SeasonTitle": SeasonTitle,
            "SeasonImagePosterCard": SeasonImagePosterCard,
            "Episode": EpisodesData,
        }

        SeasonNumber += 1 

    return {
        "Type": "Serie",
        "Status": True,

        "MyKyID": MyKyID,
        "ImdbID": ImdbID,
        "TmdbID": TmdbID,

        "TitleFeatured": TitleFeatured,
        "TitleOriginal": TitleOriginal,

        "ImagePosterCard": ImagePosterCard,
        "ImageBackground": ImageBackground,

        "Plot": Plot,
        "Genres": Genres,
        "Finished": Finished,
        "AgeRating": AgeRating,
        "ReleaseDate": ReleaseDate,

        "Seasons": Seasons
    }, True

def ProcessChunk(Chunk):
    DataChunk = []

    for _CurrentElement in Chunk:
        Result, Status = PullData(_CurrentElement)

        if Status:
            DataChunk.append(Result)

            print(isColor.Fore.GREEN + f"Finished Sucess  |  {_CurrentElement["ImdbID"]} ")
        else:
            print(isColor.Fore.RED   + f"Finished Error   |  {_CurrentElement["ImdbID"]} ")

    return DataChunk

def ScrapeInChunks(Data_Array, Chunk_Size, Max_Threads):
    Data = []

    Chunks = [Data_Array[i:i+Chunk_Size] for i in range(0, len(Data_Array), Chunk_Size)]

    with isFuturesThread.ThreadPoolExecutor(Max_Threads) as Executor:
        Futures = []

        for _Chunk in Chunks:
            Futures.append(Executor.submit(ProcessChunk, _Chunk))

        for _Future in isFuturesThread.as_completed(Futures):
            Data.extend(_Future.result())


    return Data


if __name__ == "__main__":
    print(isColor.Fore.WHITE + "                          ")
    print(isColor.Fore.RED   + "       Ć€Řβ€ŘØ            ")
    print(isColor.Fore.WHITE + "                          ")
    print(isColor.Fore.WHITE + "   ▄█▀ ▄▄▄▄▄▄▄ ▀█▄        ")
    print(isColor.Fore.WHITE + "   ▀█████████████▀        ")
    print(isColor.Fore.WHITE + "   ────█▄███▄█            ")
    print(isColor.Fore.WHITE + "   ─────█████             ")
    print(isColor.Fore.WHITE + "   ─────█▀█▀█             ")
    print(isColor.Fore.WHITE + "                          ")
    print(isColor.Fore.WHITE + "                          ")

    # Abrir o arquivo JSON e carregar os dados
    with open("DataSerie.json", "r") as File:
        Series = isJson.load(File)

    ResultData = ScrapeInChunks(Series, 7, 100)

    with open("DataSeriesFOR.json", "w") as File:
        isJson.dump(ResultData, File, indent=4, ensure_ascii=False)


































# Request_Headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "Accept-Language": "pt-BR,pt;q=0.5" }

# def RequestFromHtmlExternal(UrlExternal):
#     isBody = {
#         "form_is_submited": "base64-tools-http-request-online",
#         "form_action_url": "/tools/http-request-online",
#         "execute_http_request": "1",
#         "http_version": "1_0",
#         "url": UrlExternal,
#         "http_method": "GET",
#         "http_headers": "",
#         "http_body": "",
#     }

#     RequestTOR = isRequestsTor.RequestsTor()
    
#     while True:
#         try:
#             Response = RequestTOR.post(url="https://base64.guru/tools/http-request-online", data=isBody)
#             Code = Response.status_code
#         except:
#             Code = 500


#         if Code == 429: RequestTOR.new_id()

#         if Code == 200 or Code == 404:
#             HtmlIsURL = isBS4.BeautifulSoup(Response.content, "html.parser")

#             TitleReference = HtmlIsURL.find("b", string="Response Body:")
#             FeatherTagCode = TitleReference.find_next_sibling("pre") if TitleReference else None
#             HtmlTagCodeText = FeatherTagCode.find("code").get_text() if FeatherTagCode else None
#             HtmlWebExternal = isBS4.BeautifulSoup(HtmlTagCodeText, "html.parser") if HtmlTagCodeText else None

#             return HtmlWebExternal