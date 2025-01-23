import { Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
function InsertForm() {
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
                `${index !== 0 ? `" +` : ``}  ${item}  ${
                  index !== arrVarriables.length - 1 ? ` + "` : ``
                }`
            )
            .join(`','`)} + "')"
        `;

    return insertSQL.trim();
  };
  const handleCopyResult = () => {
    const sqlResult = hadleGenerateSQL();
    navigator.clipboard
      .writeText(sqlResult)
      .then(() => toast.success("Result copied to clipboard!"))
      .catch(() => toast.error("Failed to copy result."));
  };
  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[16px] font-medium">Input variables</h3>
      <div className="flex flex-col justify-end items-end gap-[20px]">
        <Input
          label="Table"
          type="text"
          onChange={(e) => setTable(e.target.value)}
        />
        <Textarea
          className="w-full"
          label="Colums data"
          placeholder="data1, data2, data3"
          height={300}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <h3 className="text-[16px] font-medium">Result</h3>
      <div className="w-full overflow-auto bg-[#27272a] p-4 rounded-lg">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm">
          {hadleGenerateSQL()}
        </pre>
      </div>
      <div className="flex justify-end">
        <Button
          onPress={handleCopyResult}
          className="w-[200px]"
          color="secondary"
        >
          Copy Result
        </Button>
      </div>
    </div>
  );
}

export default InsertForm;
