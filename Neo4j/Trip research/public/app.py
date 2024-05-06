from flask import Flask, request, render_template
from neo4j import GraphDatabase

app = Flask(__name__)
driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "03022002"))

def find_nearest_destination(destination):
    with driver.session() as session:
        result = session.run(
            "MATCH (start:Location)-[distance:DISTANCE]->(end:Location {name: $destination}) "
            "RETURN start.name AS source, end.name AS destination, distance.value AS distance "
            "ORDER BY distance.value LIMIT 1",
            destination=destination
        )
        return result.single()

def find_trip(source, destination):
    with driver.session() as session:
        result = session.run(
            "MATCH p1=(start:Location {name: $source})-[:TRIP]->(intermediate:Location)-[:TRIP]->(end:Location {name: $destination}) "
            "RETURN nodes(p1) AS locations, relationships(p1) AS trips "
            "UNION "
            "MATCH p2=(start:Location {name: $source})-[:TRIP*]->(end:Location {name: $destination}) "
            "RETURN nodes(p2) AS locations, relationships(p2) AS trips ",
            source=source,
            destination=destination
        )
        return result.single()



def find_nearest_province(destination):
    with driver.session() as session:
        result = session.run(
            "MATCH (start:Location {name: $destination})-[r:DISTANCE]-(end:Location) "
            "RETURN end.name AS province, r.value AS distance "
            "ORDER BY distance ASC LIMIT 1",
            destination=destination
        )
        return result.single()

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        source = request.form["source"]
        destination = request.form["destination"]
        trip_result = find_trip(source, destination)
        if not trip_result:
            nearest_province_result = find_nearest_province(destination)
            if nearest_province_result:
                nearest_province = nearest_province_result["province"]
                nearest_trip_result = find_trip(source, nearest_province)
                if nearest_trip_result:
                    return render_template("result.html", result=nearest_trip_result, distance=nearest_province_result["distance"])
        if trip_result:
            return render_template("result.html", result=trip_result)
        else:
            return render_template("index.html", error="No trips found.")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8000)
