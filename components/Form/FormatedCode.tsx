import { useState } from "react";
import { Textarea, Button, Card } from "@heroui/react"; // Import từ @heroui/react
import toast from "react-hot-toast";

export default function FormatedCode() {
  const [inputCode, setInputCode] = useState<string>(""); // Đoạn code đầu vào
  const [formattedCode, setFormattedCode] = useState<string>(""); // Code đã format

  // Hàm định dạng code C#
  const formatCSharpCode = (code: string): string => {
    let indentLevel = 0; // Đếm mức thụt lề
    const indentSize = 4; // Mỗi mức thụt lề là 4 khoảng trắng

    return code
      .split("\n")
      .map((line) => line.trim()) // Xóa khoảng trắng dư thừa
      .map((line) => {
        if (line.endsWith("}")) indentLevel -= 1; // Giảm thụt lề nếu kết thúc bằng `}`

        const formattedLine = `${" ".repeat(
          Math.max(indentLevel, 0) * indentSize
        )}${line}`; // Thêm thụt lề

        if (line.endsWith("{")) indentLevel += 1; // Tăng thụt lề nếu kết thúc bằng `{`

        return formattedLine;
      })
      .join("\n");
  };

  // Hàm xử lý khi bấm "Format Code"
  const handleFormatCode = () => {
    const result = formatCSharpCode(inputCode); // Gọi hàm format
    setFormattedCode(result); // Lưu kết quả
  };

  // Hàm sao chép code đã format
  const handleCopyCode = () => {
    if (formattedCode) {
      navigator.clipboard.writeText(formattedCode).then(() => {
        toast.success("Result copied to clipboard!");
      });
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <h2>C# Code Formatter</h2>

      <Textarea
        placeholder="Nhập code C# tại đây..."
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        rows={10}
        style={{ width: "100%" }}
      />

      <div className="grid grid-cols-2 gap-[10px]">
        <Button
          onPress={handleFormatCode}
          style={{
            marginBottom: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
          }}
        >
          Format Code
        </Button>
        <Button
          onPress={handleCopyCode}
          style={{
            backgroundColor: "#28A745",
            color: "#fff",
          }}
          disabled={!formattedCode}
        >
          Copy Result
        </Button>
      </div>
      <Card className="p-[20px]">
        <h3>Kết quả:</h3>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {formattedCode || "Code sẽ hiển thị tại đây sau khi format."}
        </pre>
      </Card>
    </div>
  );
}
