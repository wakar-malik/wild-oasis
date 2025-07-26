import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useCabinDelete";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Row from "../../ui/Row";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const ActionButton = styled.button`
  padding: 1rem;
  border: 2px solid var(--color-brand-600);
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const { isDeletingCabin, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function DuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Row type="horizontal">
            <ActionButton disabled={isCreating} onClick={DuplicateCabin}>
              <HiSquare2Stack />
            </ActionButton>
            <ActionButton onClick={() => setShowForm((prev) => !prev)}>
              <HiPencil />
            </ActionButton>
            <ActionButton onClick={() => setConfirmDeletion(true)}>
              <HiTrash />
            </ActionButton>
          </Row>
          {confirmDeletion && (
            <Modal>
              <Row>
                <Heading as="h3">
                  Do you really want to delete Cabin {name} permanently!
                </Heading>
                <Row type="horizontal">
                  <Button
                    variation="secondary"
                    onClick={() => setConfirmDeletion(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isDeletingCabin}
                    onClick={() => {
                      deleteCabin(cabinId);
                      setConfirmDeletion(false);
                    }}
                  >
                    Confirm Cancel
                  </Button>
                </Row>
              </Row>
            </Modal>
          )}
        </div>
      </TableRow>

      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
