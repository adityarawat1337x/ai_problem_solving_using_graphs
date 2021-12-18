import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Neo4jProvider } from "use-neo4j";

ReactDOM.render(
  <React.StrictMode>
    <Neo4jProvider
      scheme="neo4j+s"
      host="4e736fc0.databases.neo4j.io"
      port="7687"
      username="neo4j"
      password="1CIP0aHK08pnjJQWVU-s70uS14QF7j_hGkQV0mXY8hs"
      database="neo4j"
    >
      <App />
    </Neo4jProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
