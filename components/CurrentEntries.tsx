import { Card, Container, Spinner } from "@chakra-ui/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { LOTTERY_CONTRACT_ADDRESS } from "../const/addresses";
import EntryCard from "./EntryCard";

interface CurrentEntriesProps {
  walletAddress: string;
}

const CurrentEntries = ({ walletAddress }: CurrentEntriesProps) => {
  const { contract } = useContract(LOTTERY_CONTRACT_ADDRESS);

  const { data: entries, isLoading: entriesLoading } = useContractRead(contract, "getPlayers");

  console.log(entries);

  return (
    <Container py={8}>
      {!entriesLoading ? (
        entries
          .filter((entry: any) => entry === walletAddress)
          .map((entry: any, index: number) => (
            <EntryCard key={index} walletAddress={entry} />
          ))
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default CurrentEntries;
