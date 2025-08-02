import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Table from "../../ui/Table";

function CabinTable() {
  const [searchParam] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;

  let filteredCabins;
  const filterValue = searchParam.get("discount") || "all";

  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => +cabin.discount > 0);
  }

  if (filteredCabins.length === 0) {
    return (
      <Row type="horizontal">
        <Heading>No cabins found!</Heading>
      </Row>
    );
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div />
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={filteredCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
