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

const Movies = (uid) => {
  console.log(uid.uid);
  const query = `match (u:Users)-[r:RATED]->(m:Movies) where u.user_id=$id return m,r limit 200`;

  const { loading, error, records, first } = useReadCypher(query, {
    id: uid.uid,
  });

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
        records.map((row) => row.get("u").properties.user_id;
        );
  }

  return (
    <Flex w="100vw" justifyContent="center" p={100}>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Movie Id</Th>
            <Th>Movie Name</Th>
            <Th>Release Date</Th>
            <Th>Rating</Th>
          </Tr>
          Action: "0" Adventure: "0" Animation: "0" Children: "0" Comedy: "0"
          Crime: "0" Documentary: "0" Drama: "1" Fantasy: "0" Film_Noir: "0"
          Horror: "0" IMDb_URL:
          "http://us.imdb.com/M/title-exact?Field%20of%20Dreams%20(1989)"
          Musical: "0" Mystery: "0" Romance: "0" Scifi: "0" Thriller: "0" War:
          "0" Western: "0" movie_id: "215" movie_title: "Field of Dreams (1989)"
          release_date: "01-Jan-1989" unknown: "0"
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Flex>
  );
};

export default Movies;
