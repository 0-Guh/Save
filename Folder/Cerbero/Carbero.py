#! /usr/bin/env python3

# import concurrent.futures as isFuturesThread
# import requests_tor as isRequestsTor
# import colorama as isColor



# def RequestUrlInTor(Request_URL, Request_Headers):
#     RequestTOR = isRequestsTor.RequestsTor()
    
#     while True:
#         try:
#             Response = RequestTOR.get(url=Request_URL, headers=Request_Headers)
#             Code = Response.status_code
#         except: 
#             Code = 500

#         if Code == 429: RequestTOR.new_id()
#         if Code == 200: return Response, True
#         if Code == 404: return Response, False

# def PullData(Current_Data):
#     return {}, True

# def ProcessChunk(Chunk):
#     DataChunk = []

#     for _CurrentElement in Chunk:
#         Result, Status = PullData(_CurrentElement)

#         if Status:
#             DataChunk.append(Result)

#             print(isColor.Fore.GREEN + f"Finished Sucess  |  {_CurrentElement} ")
#         else:
#             print(isColor.Fore.RED   + f"Finished Error   |  {_CurrentElement} ")

#     return DataChunk

# def ScrapeInChunks(Data_Array, Chunk_Size, Max_Threads):
    # Data = []

    # Chunks = [Data_Array[i:i+Chunk_Size] for i in range(0, len(Data_Array), Chunk_Size)]

    # with isFuturesThread.ThreadPoolExecutor(Max_Threads) as Executor:
    #     Futures = []

    #     for _Chunk in Chunks:
    #         Futures.append(Executor.submit(ProcessChunk, _Chunk))

    #     for _Future in isFuturesThread.as_completed(Futures):
    #         Data.extend(_Future.result())


    # return Data


# if __name__ == "__main__":
#     print(isColor.Fore.WHITE + "                          ")
#     print(isColor.Fore.RED   + "       Ć€Řβ€ŘØ            ")
#     print(isColor.Fore.WHITE + "                          ")
#     print(isColor.Fore.WHITE + "   ▄█▀ ▄▄▄▄▄▄▄ ▀█▄        ")
#     print(isColor.Fore.WHITE + "   ▀█████████████▀        ")
#     print(isColor.Fore.WHITE + "   ────█▄███▄█            ")
#     print(isColor.Fore.WHITE + "   ─────█████             ")
#     print(isColor.Fore.WHITE + "   ─────█▀█▀█             ")
#     print(isColor.Fore.WHITE + "                          ")
#     print(isColor.Fore.WHITE + "                          ")
