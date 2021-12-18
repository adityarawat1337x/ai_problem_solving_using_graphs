import { React, useState } from "react";
import { useReadCypher } from "use-neo4j";
import { Grid, GridItem, Flex, Button, Center } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import RMovies from "./RMovies";

const Movies = (uid) => {
  const [query, setState] = useState(
    "match (u:Users)-[r:RATED]->(m:Movies) where u.user_id=$id return m,r limit 200"
  );

  const [flag, setFlag] = useState(false);

  console.log("ReRENDERED: ", query, uid.uid);

  const { loading, error, records, first } = useReadCypher(query, {
    id: uid.uid,
  });

  let movieData = [];

  if (loading)
    return (
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="end"
        border="0"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
      ></Button>
    );

  if (records) {
    console.log(records);
    records.map((row) => {
      movieData.push({
        id: row.get("m").properties.movie_id,
        name: row.get("m").properties.movie_title,
        date: row.get("m").properties.release_date,
        rating: row.get("r").properties.Rating,
      });
    });
  }

  if (movieData && !flag)
    return (
      <Flex
        w="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={100}
      >
        <Button
          colorScheme="telegram"
          variant="solid"
          alignItems="center"
          justifyContent="center"
          fontSize="1xl"
          m={30}
          color="black"
          onClick={() => {
            setFlag(true);
          }}
        >
          Genrate Recommendations
        </Button>
        <Table variant="simple" m={100}>
          <TableCaption>Dataset of movies</TableCaption>
          <Thead>
            <Tr>
              <Th>Movie Id</Th>
              <Th>Movie Name</Th>
              <Th>Release Date</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movieData.map((dt) => (
              <Tr key={dt.id}>
                <Td>{dt.id}</Td>
                <Td>{dt.name}</Td>
                <Td>{dt.date}</Td>
                <Td>{dt.rating}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    );
  else return <RMovies uid={uid} />;
};

export default Movies;
