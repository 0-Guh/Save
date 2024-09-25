import flask as isFlask
import json as isJson


Application = isFlask.Flask(__name__)


with open("Database.json") as File:
    AllData = isJson.load(File)



@Application.route("/getDataMyKyID/<MyKyID>")
def getDataMyKyID(MyKyID):
    DataReturn = AllData.get(MyKyID, {})

    return isFlask.jsonify(DataReturn), 200 if DataReturn else 204 


@Application.route("/getDataInitial/<Genres>")
def getDataInitial(Genres):
    FilterYear = isFlask.request.args.get("year", type=int)


    FormatGenres = [_Genre.lower().replace("-", " ") for _Genre in Genres.split("@")]

    if Genres == "all":
        DataReturn = list(AllData.values())
    if Genres != "all":
        DataReturn = []

        for _Item in AllData.values():
            ItemGenres = [Genre.lower() for Genre in _Item["Genres"]]

            if all(_Genre in ItemGenres for _Genre in FormatGenres):
                DataReturn.append(_Item)

    if FilterYear:
        DataReturn = DataReturn = [_Item for _Item in DataReturn if _Item["ReleaseDate"]["Year"] == FilterYear]


    return isFlask.jsonify(DataReturn), 200 if DataReturn else 204
