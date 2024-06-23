import React from "react";

const RemarkItem = ({ remark }) => {
  return (
    <div className="remark">
      <p>{remark.text}</p>
      <p>
        <strong>Status:</strong> {remark.status}
      </p>
      <p>
        <strong>Date:</strong> {remark.date}
      </p>
    </div>
  );
};

export default RemarkItem;
