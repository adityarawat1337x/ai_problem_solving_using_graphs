import { React, useState } from "react";
import { useReadCypher } from "use-neo4j";
import { Grid, GridItem, Box, Button, Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Movies from "./Movies";
import Avatar from "react-avatar";

const Users = () => {
  const [uid, setUid] = useState(-1);

  const details = (uid) => {
    console.log(uid);
    setUid(uid);
  };

  const query = `match (u:Users) return u limit 200`;

  const { loading, error, records, first } = useReadCypher(query);

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

  if (uid != -1) {
    return <Movies uid={uid} />;
  }

  return (
    <Flex
      w="100vw"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={100}
    >
      <Heading>Movie Recommendation</Heading>
      <Heading fontSize="lg">Select a user 👇</Heading>
      <Grid
        templateColumns="repeat(7, 1fr)"
        bg="white"
        gap={6}
        h="700px"
        overflow="scroll"
        p={50}
        borderRadius="10"
        m={50}
      >
        {records &&
          records.map((row) => {
            return (
              <GridItem
                key={row.get("u").properties.user_id}
                onClick={() => {
                  details(row.get("u").properties.user_id);
                }}
              >
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  overflow="hidden"
                  bg="#3b4152"
                  textAlign="center"
                  p={2}
                  borderRadius="10"
                >
                  <Avatar
                    round={true}
                    name={row.get("u").properties.occupation}
                  ></Avatar>
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    color="#ffffff"
                    lineHeight="tight"
                    textTransform="capitalize"
                  >
                    {row.get("u").properties.occupation}
                  </Box>
                </Box>
              </GridItem>
            );
          })}
      </Grid>
    </Flex>
  );
};

export default Users;
