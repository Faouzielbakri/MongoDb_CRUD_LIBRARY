import { useState } from "react";

const DocumentForm = () => {
  const [title, setTitle] = useState("");
  const [availability, setAvailability] = useState(true);
  const [type, setType] = useState<"book" | "periodical">("book");
  const [yearOfPublication, setYearOfPublication] = useState<
    number | undefined
  >(undefined);
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [periodicity, setPeriodicity] = useState<
    "weekly" | "monthly" | "daily"
  >("monthly");
  const [dateOfPublication, setDateOfPublication] = useState<Date | undefined>(
    undefined
  );
  const [copies, setCopies] = useState([
    { copy_id: "" },
    { copy_id: "" },
    { copy_id: "" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const document = {
      title,
      availability,
      type,
      year_of_publication: yearOfPublication,
      publisher,
      author,
      periodicity,
      date_of_publication: dateOfPublication,
      copies,
    };

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      });
      const data = await response.json();
      if (data.success) {
        alert("Document added successfully");
      } else {
        alert("Failed to add document");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add document");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "book" | "periodical")}
      >
        <option value="book">Book</option>
        <option value="periodical">Periodical</option>
      </select>
      {type === "book" && (
        <>
          <input
            type="number"
            placeholder="Year of Publication"
            value={yearOfPublication}
            onChange={(e) => setYearOfPublication(parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </>
      )}
      {type === "periodical" && (
        <>
          <select
            value={periodicity}
            onChange={(e) =>
              setPeriodicity(e.target.value as "weekly" | "monthly" | "daily")
            }
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
          <input
            type="date"
            placeholder="Date of Publication"
            value={dateOfPublication?.toISOString().split("T")[0] || ""}
            onChange={(e) => setDateOfPublication(new Date(e.target.value))}
          />
        </>
      )}
      {copies.map((copy, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Copy ID ${index + 1}`}
          value={copy.copy_id}
          onChange={(e) => {
            const newCopies = [...copies];
            newCopies[index].copy_id = e.target.value;
            setCopies(newCopies);
          }}
        />
      ))}
      <button type="submit">Add Document</button>
    </form>
  );
};

export default DocumentForm;
