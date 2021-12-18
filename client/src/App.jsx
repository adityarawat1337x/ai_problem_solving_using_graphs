import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useReadCypher } from "use-neo4j";
import "./App.css";
import Users from "./components/Users";

function App() {
  //   const query = `match  (u:Users)-[r:RATED]->(m:Movies)<-[r2:RATED]-(u2:Users) where u.user_id='239' and r.Rating='5' and r2.Rating='5' with u2,r,u,m,r2 match (m2:Movies)<-[r3:RATED]-(u2) where r3.Rating='5' and  not EXISTS((u)-[:RATED]-(m2)) return distinct u, m2
  // `;
  //   // const params = { title: "The Matrix" };

  //   const { loading, error, records, first } = useReadCypher(query);

  //   if (loading) return <div>Loading...</div>;

  //   // Get `m` from the first row
  //   // const movie = first.get("m");
  //   if (records)
  //     console.log(records.map((row) => row.get("m2").properties.movie_id));
  return (
    <ChakraProvider>
      <Users />
    </ChakraProvider>
  );
}

export default App;
