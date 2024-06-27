import React, { useState, useEffect } from "react";
import AddRemarkForm from "./AddRemarkForm";
import ClearFiltersButton from "./ClearFiltersButton";
import RemarkItem from "./RemarkItem";

const initialCompaniesData = [
  {
    name: "Company A",
    academicYears: ["2023-24", "2024-25"],
    remarks: {
      "2023-24": [
        {
          id: 1,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "Still Communication",
          date: "2023-01-15",
        },
        {
          id: 2,
          text: "Proin euismod felis et dolor viverra, at aliquam nunc gravida.",
          status: "Confirmed",
          date: "2023-02-20",
        },
      ],
      "2024-25": [
        {
          id: 3,
          text: "Aliquam erat volutpat. Nullam rutrum ultrices enim.",
          status: "Paused",
          date: "2024-01-10",
        },
        {
          id: 4,
          text: "Aliquam erat volutp.",
          status: "Paused",
          date: "2025-01-10",
        },
      ],
    },
  },
  {
    name: "Company B",
    academicYears: ["2023-24", "2024-25"],
    remarks: {
      "2023-24": [
        {
          id: 5,
          text: "Phasellus eget nibh nec nunc tincidunt cursus at a est.",
          status: "Still Communication",
          date: "2023-03-15",
        },
        {
          id: 6,
          text: "Duis sit amet nulla a metus efficitur ultricies.",
          status: "Confirmed",
          date: "2023-04-20",
        },
      ],
      "2024-25": [
        {
          id: 7,
          text: "Cras at felis dignissim, malesuada sapien in, tempus metus.",
          status: "Paused",
          date: "2024-02-10",
        },
        {
          id: 8,
          text: "Morbi congue nulla sit amet felis vulputate hendrerit.",
          status: "Paused",
          date: "2024-03-05",
        },
      ],
    },
  },
];

const CompanyRemark = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [showAddRemarkForm, setShowAddRemarkForm] = useState(false);
  const [remarksDisplayed, setRemarksDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please select college and academic year to view its remarks"
  );

  useEffect(() => {
    setErrorMessage(
      "Please select college and academic year to view its remarks"
    );
  }, []);

  const handleCompanyChange = (e) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);
    setSelectedYear(""); // Reset selected year when company changes
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message
    // Reset remarks when changing the selected company
    setRemarks([]);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(""); // Reset error message
    // Reset remarks when changing the selected year
    setRemarks([]);
  };

  const handleDisplayRemarks = () => {
    if (!selectedCompany || !selectedYear) {
      setRemarks([]);
      setErrorMessage(
        "Please select college and academic year to view its remarks"
      );
      return;
    }
    const company = initialCompaniesData.find(
      (c) => c.name === selectedCompany
    );
    if (company && company.remarks[selectedYear]) {
      setRemarks(company.remarks[selectedYear]);
      setRemarksDisplayed(true); // Set remarks display status to true
      setErrorMessage(""); // Reset error message
    } else {
      // If no remarks found for the selected company and year, set remarks to an empty array
      setRemarks([]);
      setErrorMessage(""); // Reset error message
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setSelectedYear("");
    setRemarks([]);
    setShowAddRemarkForm(false);
    setRemarksDisplayed(false); // Reset remarks display status
    setErrorMessage(
      "Please select college and academic year to view its remarks"
    ); // Reset error message
  };

  const handleAddRemark = (newRemark) => {
    // Find the company index in the initialCompaniesData array
    const companyIndex = initialCompaniesData.findIndex(
      (c) => c.name === selectedCompany
    );

    // Check if the company exists in the initialCompaniesData array and if remarks for the selected year exist
    if (
      companyIndex !== -1 &&
      initialCompaniesData[companyIndex].remarks[selectedYear]
    ) {
      // Find the remarks array for the selected year
      const remarksForYear = [
        ...initialCompaniesData[companyIndex].remarks[selectedYear],
      ];

      // Add the new remark to the remarks array for the selected year
      remarksForYear.push(newRemark);

      // Update the initialCompaniesData to reflect the changes
      const updatedCompaniesData = [...initialCompaniesData];
      updatedCompaniesData[companyIndex].remarks[selectedYear] = remarksForYear;

      // Update the state to reflect the changes
      setRemarks(remarksForYear);
    }

    // Close the form after adding a remark
    setShowAddRemarkForm(false);
  };
  return (
    <div className="container">
      <div className="header">
        <select
          className="companyname-dropdown"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          <option value="">Select Company</option>
          {initialCompaniesData.map((company) => (
            <option key={company.name} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
        <select
          className="academic-year-dropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Academic Year</option>
          {selectedCompany &&
            initialCompaniesData
              .find((c) => c.name === selectedCompany)
              .academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
        </select>
        <button onClick={handleDisplayRemarks}>Display Remarks</button>
      </div>
      <ClearFiltersButton onClick={handleClearFilters} />

      {errorMessage && (
        <p>
          <div className="no-selection-message">{errorMessage}</div>
        </p>
      )}
      {remarksDisplayed && (
        <div className="remark-list">
          <div className="perfectMatch">
            <h2>Contact Remarks</h2>
            <p>Displaying the Interactions and Remark History</p>
            <div className="line"></div>
          </div>
          {remarks.length > 0 ? (
            remarks.map((remark) => (
              <RemarkItem key={remark.id} remark={remark} />
            ))
          ) : (
            <p>No remarks available.</p>
          )}
        </div>
      )}
      <div className="buttonAdd">
        {remarksDisplayed && selectedCompany && selectedYear && (
          <button onClick={() => setShowAddRemarkForm(true)}>
            Add Remarks
          </button>
        )}
      </div>

      {showAddRemarkForm && (
        <AddRemarkForm
          onAddRemark={handleAddRemark}
          showModal={showAddRemarkForm}
          setShowModal={setShowAddRemarkForm}
        />
      )}
    </div>
  );
};

export default CompanyRemark;
