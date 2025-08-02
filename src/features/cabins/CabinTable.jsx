import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Table from "../../ui/Table";

function CabinTable() {
  const [searchParam] = useSearchParams();
  const { isLoading, cabins, error } = useCabins();

  if (error) return <h1>No cabins found (internet issues)</h1>;
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

  const sortValue = searchParam.get("sortBy") || "startDate-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

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
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
