import React, { useState } from "react";
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

  const handleCompanyChange = (e) => {
    const companyName = e.target.value;
    setSelectedCompany(companyName);
    setSelectedYear(""); // Reset selected year when company changes
    setRemarksDisplayed(false); // Reset remarks display status
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setRemarksDisplayed(false); // Reset remarks display status
  };

  const handleDisplayRemarks = () => {
    if (!selectedCompany || !selectedYear) {
      setRemarks([]);
      return;
    }
    const company = initialCompaniesData.find(
      (c) => c.name === selectedCompany
    );
    if (company && company.remarks[selectedYear]) {
      setRemarks(company.remarks[selectedYear]);
      setRemarksDisplayed(true); // Set remarks display status to true
    } else {
      setRemarks([]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("");
    setSelectedYear("");
    setRemarks([]);
    setShowAddRemarkForm(false);
    setRemarksDisplayed(false); // Reset remarks display status
  };

  const handleAddRemark = (newRemark) => {
    // Find the company object
    const company = initialCompaniesData.find(
      (c) => c.name === selectedCompany
    );

    // Check if the company and selected year exist
    if (company && company.academicYears.includes(selectedYear)) {
      // Find the remarks array for the selected year
      const remarksForYear = company.remarks[selectedYear];

      // Add the new remark to the remarks array for the selected year
      remarksForYear.push(newRemark);

      // Update the state to reflect the changes
      setRemarks(remarksForYear);
    }

    // Close the form after adding a remark
    setShowAddRemarkForm(false);
  };

  return (
    <div className="container">
      <div className="header">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="">Select Company</option>
          {initialCompaniesData.map((company) => (
            <option key={company.name} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
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
        <ClearFiltersButton onClick={handleClearFilters} />
        <button onClick={handleDisplayRemarks}>Display Remarks</button>
        {remarksDisplayed && selectedCompany && selectedYear && (
          <button onClick={() => setShowAddRemarkForm(true)}>
            Add Remarks
          </button>
        )}
      </div>
      <div>
        {remarks.length > 0 ? (
          <ul>
            {remarks.map((remark) => (
              <li key={remark.id}>
                <RemarkItem remark={remark} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No remarks available.</p>
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