"use client";
import { Input, Select, SelectItem } from "@heroui/react";
import { Textarea } from "@nextui-org/react";
import { useState } from "react";

const queries = [
  { key: "Insert", label: "Insert" },
  { key: "Select", label: "Select" },
  { key: "Delete", label: "Delete" },
  { key: "Update", label: "Update" },
];

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [table, setTable] = useState<string>("");
  const hadleGenerateSQL = () => {
    let insertSQL = "";
    const arrVarriables = input.split(",").map((item) => item.trim());

    insertSQL = `
      "INSERT INTO ${table} " +
      "(${arrVarriables.map((item) => `[${item}]`).join(",")}) " +
      "VALUES " +
      "('" + ${arrVarriables
        .map(
          (item, index) =>
            `${index !== 0 ? `"'" +` : ``}  ${item}  ${
              index !== arrVarriables.length - 1 ? ` + "'"` : ``
            }`
        )
        .join(`","`)} + "')"
    `;

    return insertSQL.trim();
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <section className="w-[800px] bg-[#e5f9d7] p-[20px] rounded-[10px] flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold">Format string SQL</h2>
        <div className="flex flex-col gap-[20px]">
          <Select className="max-w-xs" label="Select query">
            {queries.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <h3 className="text-[16px] font-medium">Input variables</h3>
          <div className="flex flex-col justify-end items-end gap-[20px]">
            <Input
              label="Table"
              type="text"
              onChange={(e) => setTable(e.target.value)}
            />
            <Textarea
              className="w-full"
              label="Description"
              placeholder="Enter your description"
              height={300}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <h3 className="text-[16px] font-medium">Result</h3>
          <div className="w-full overflow-auto bg-gray-100 p-4 rounded-lg border border-gray-300">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm">
              {hadleGenerateSQL()}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
