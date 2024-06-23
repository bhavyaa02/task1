import React, { useState, useRef, useEffect } from "react";

const AddRemarkForm = ({ onAddRemark, showModal, setShowModal }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Still Communication");
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a remark.");
      return;
    }
    const newRemark = {
      text: text.trim(),
      status: status,
      date: new Date().toISOString().split("T")[0],
    };
    onAddRemark(newRemark);
    setText("");
    setStatus("Still Communication");

    handleCloseModal();
  };

  useEffect(() => {
    if (showModal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [showModal]);

  const handleCloseModal = () => {
    modalRef.current.close();
    setShowModal(false);
  };
  return (
    <dialog ref={modalRef} className="add-remark-modal">
      <button onClick={handleCloseModal} className="close-btn">
        x
      </button>
      <h2>Add New Remark</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Remark:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            cols="50"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Still Communication">Still Communication</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
        <button type="submit">Add Remark</button>
      </form>
    </dialog>
  );
};

export default AddRemarkForm;
