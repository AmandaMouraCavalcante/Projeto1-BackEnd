import { MongoClient } from "mongodb";

async function main() {
  const uri = "mongodb+srv://melalgon10:zv5dPJTJ6olypslA@cluster0.gtrlriu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("sample_mflix");  // nome do banco
    const collection = database.collection("movies");  // nome da coleção

    // Aqui você faz uma consulta simples para testar
    const movies = await collection.find({}).limit(5).toArray();

    console.log("5 filmes do banco:", movies);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

