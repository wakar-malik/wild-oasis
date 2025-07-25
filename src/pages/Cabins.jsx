import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Modal from "../ui/Modal";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/ Sort</p>
      </Row>

      <Row>
        <div>
          <Button onClick={() => setIsOpenModal((prev) => !prev)}>
            Add new cabin
          </Button>
        </div>

        {isOpenModal && (
          <Modal onCloseModal={() => setIsOpenModal(false)}>
            <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
          </Modal>
        )}
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
