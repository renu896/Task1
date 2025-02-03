import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./TableToPDF.css"; // Import the custom CSS file

const TableToPDF = () => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "", date: "" });
  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.age && formData.date) {
      setTableData([...tableData, formData]);
      setFormData({ name: "", email: "", age: "", date: "" }); // Reset form
    } else {
      alert("Please fill in all fields!");
    }
  };

  const generatePDF = () => {
    const table = document.getElementById("tableToPDF");
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("table.pdf");
    });
  };

  return (
    <div className="pdf-container">
      <h1 className="pdf-title">Enter data</h1>

      {/* Form Section */}
      <form className="pdf-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn submit-btn">Add to Table</button>
      </form>

      {/* Table Section */}
      <h2 className="table-title">User Data</h2>
      <div className="table-wrapper">
        <table id="tableToPDF">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button onClick={generatePDF} className="btn pdf-btn">Download</button>
    </div>
  );
};

export default TableToPDF;
