"use client";
import DeleteForm from "@/components/Form/DeleteForm";
import InsertForm from "@/components/Form/InsertForm";
import SelectForm from "@/components/Form/SelectForm";
import UpdateForm from "@/components/Form/UpdateForm";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";

const queries = [
  { key: "Insert", label: "Insert" },
  { key: "Select", label: "Select" },
  { key: "Delete", label: "Delete" },
  { key: "Update", label: "Update" },
];

export default function Home() {
  const [selectedQuery, setSelectedQuery] = useState<string>("Insert");

  const renderForm = () => {
    switch (selectedQuery) {
      case "Insert":
        return <InsertForm />;
      case "Select":
        return <SelectForm />;
      case "Delete":
        return <DeleteForm />;
      case "Update":
        return <UpdateForm />;
      default:
        return <p>Please select a query type.</p>;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <section className="w-[800px] bg-[#3d3d3d] p-[20px] rounded-[10px] flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold">Format string SQL</h2>
        <Select
          className="my-[20px]"
          label="Select query"
          placeholder="Select query"
          defaultSelectedKeys={["Insert"]}
          onChange={(event) => setSelectedQuery(event.target.value)}
        >
          {queries.map((query) => (
            <SelectItem key={query.key} value={query.key}>
              {query.label}
            </SelectItem>
          ))}
        </Select>

        {renderForm()}
      </section>
    </div>
  );
}
