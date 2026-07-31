"use client";

import { useState } from "react";

const panel =
  "rounded-3xl border border-[#E7D8C7] bg-[#FFFCF8] p-6 shadow-[0_16px_45px_rgba(91,62,38,.08)] sm:p-8";

const button =
  "rounded-2xl bg-[#A7744D] px-5 py-3 font-bold text-white transition hover:bg-[#8F603D] disabled:cursor-not-allowed disabled:opacity-50";

const CONVERTER_API_URL = (
  process.env.NEXT_PUBLIC_CONVERTER_API_URL ||
  "https://api.alltoolkit.org"
).replace(/\/$/, "");


function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = name;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function cleanFileName(fileName: string, extensionPattern: RegExp) {
  return fileName.replace(extensionPattern, "") || "converted";
}

function FilePicker({
  accept,
  label,
  file,
  onFile,
  serverProcessed = false,
}: {
  accept: string;
  label: string;
  file: File | null;
  onFile: (file: File | null) => void;
  serverProcessed?: boolean;
}) {
  return (
    <>
      <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#D9C4AE] bg-[#FFF9F2] px-6 text-center transition hover:border-[#A7744D] hover:bg-[#F8EDE1]">
        <span className="text-lg font-black text-[#2D241C]">
          {label}
        </span>

        <span className="mt-2 text-sm text-[#6B5B4D]">
          {serverProcessed
            ? "Your file is securely sent to the conversion server."
            : "The file is processed in your browser."}
        </span>

        <input
          className="hidden"
          type="file"
          accept={accept}
          onChange={(event) => {
            onFile(event.target.files?.[0] || null);
          }}
        />
      </label>

      {file && (
        <p className="mt-3 break-all font-bold text-[#4A3A2E]">
          {file.name}
        </p>
      )}
    </>
  );
}

function Message({
  error,
  note,
}: {
  error: string;
  note?: string;
}) {
  return (
    <>
      {error && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {note && (
        <p className="mt-4 text-sm leading-6 text-[#6B5B4D]">
          {note}
        </p>
      )}
    </>
  );
}

async function getResponseError(response: Response) {
  const responseText = await response.text();

  if (!responseText) {
    return `Conversion failed with status ${response.status}.`;
  }

  try {
    const data = JSON.parse(responseText) as {
      error?: string;
      message?: string;
    };

    return (
      data.error ||
      data.message ||
      `Conversion failed with status ${response.status}.`
    );
  } catch {
    return responseText;
  }
}

async function convertOfficeFileToPdf(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${CONVERTER_API_URL}/convert/office-to-pdf`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(await getResponseError(response));
  }

  return response.blob();
}

async function convertPdfToWord(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${CONVERTER_API_URL}/convert/pdf-to-word`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(await getResponseError(response));
  }

  return response.blob();
}

async function convertPdfOnServer(
  file: File,
  endpoint: "pdf-to-excel" | "pdf-to-powerpoint"
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${CONVERTER_API_URL}/convert/${endpoint}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(await getResponseError(response));
  }

  return response.blob();
}


function OfficeToPdfTool({
  accept,
  label,
  buttonLabel,
  convertingLabel,
  filePattern,
  fallbackName,
}: {
  accept: string;
  label: string;
  buttonLabel: string;
  convertingLabel: string;
  filePattern: RegExp;
  fallbackName: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!file) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const pdfBlob = await convertOfficeFileToPdf(file);

      const originalName = cleanFileName(file.name, filePattern);

      saveBlob(
        pdfBlob,
        `${originalName || fallbackName}.pdf`
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The file could not be converted."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={panel}>
      <FilePicker
        accept={accept}
        label={label}
        file={file}
        onFile={setFile}
        serverProcessed
      />

      <Message
        error={error}
        note="Converted using LibreOffice on the AllToolkit server to preserve the original document layout."
      />

      <button
        className={`${button} mt-5`}
        disabled={!file || busy}
        onClick={run}
      >
        {busy ? convertingLabel : buttonLabel}
      </button>
    </div>
  );
}

export function WordToPdfTool() {
  return (
    <OfficeToPdfTool
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      label="Choose a Word document"
      buttonLabel="Convert Word to PDF"
      convertingLabel="Converting Word…"
      filePattern={/\.docx?$/i}
      fallbackName="word-to-pdf"
    />
  );
}

export function ExcelToPdfTool() {
  return (
    <OfficeToPdfTool
      accept=".xls,.xlsx,.ods,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      label="Choose an Excel spreadsheet"
      buttonLabel="Convert Excel to PDF"
      convertingLabel="Converting Excel…"
      filePattern={/\.(xlsx?|ods|csv)$/i}
      fallbackName="excel-to-pdf"
    />
  );
}

export function PowerPointToPdfTool() {
  return (
    <OfficeToPdfTool
      accept=".ppt,.pptx,.odp,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      label="Choose a PowerPoint presentation"
      buttonLabel="Convert PowerPoint to PDF"
      convertingLabel="Converting PowerPoint…"
      filePattern={/\.(pptx?|odp)$/i}
      fallbackName="powerpoint-to-pdf"
    />
  );
}

export function PdfToWordTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!file) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const wordBlob = await convertPdfToWord(file);

      saveBlob(
        wordBlob,
        `${cleanFileName(file.name, /\.pdf$/i)}.docx`
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not convert this PDF to Word."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={panel}>
      <FilePicker
        accept="application/pdf,.pdf"
        label="Choose a PDF"
        file={file}
        onFile={setFile}
        serverProcessed
      />

      <Message
        error={error}
        note="Converted on the AllToolkit server into an editable Microsoft Word document."
      />

      <button
        className={`${button} mt-5`}
        disabled={!file || busy}
        onClick={run}
      >
        {busy ? "Converting PDF…" : "Convert PDF to Word"}
      </button>
    </div>
  );
}

export function PdfToExcelTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!file) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const excelBlob = await convertPdfOnServer(
        file,
        "pdf-to-excel"
      );

      saveBlob(
        excelBlob,
        `${cleanFileName(file.name, /\.pdf$/i)}.xlsx`
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not convert this PDF to Excel."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={panel}>
      <FilePicker
        accept="application/pdf,.pdf"
        label="Choose a PDF"
        file={file}
        onFile={setFile}
        serverProcessed
      />

      <Message
        error={error}
        note="Converted on the AllToolkit server into an editable Microsoft Excel workbook. PDFs with clear digital tables provide the best results."
      />

      <button
        className={`${button} mt-5`}
        disabled={!file || busy}
        onClick={run}
      >
        {busy ? "Converting PDF…" : "Convert PDF to Excel"}
      </button>
    </div>
  );
}

export function PdfToPowerPointTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    if (!file) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const powerPointBlob = await convertPdfOnServer(
        file,
        "pdf-to-powerpoint"
      );

      saveBlob(
        powerPointBlob,
        `${cleanFileName(file.name, /\.pdf$/i)}.pptx`
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not convert this PDF to PowerPoint."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={panel}>
      <FilePicker
        accept="application/pdf,.pdf"
        label="Choose a PDF"
        file={file}
        onFile={setFile}
        serverProcessed
      />

      <Message
        error={error}
        note="Converted on the AllToolkit server into an editable Microsoft PowerPoint presentation."
      />

      <button
        className={`${button} mt-5`}
        disabled={!file || busy}
        onClick={run}
      >
        {busy
          ? "Converting PDF…"
          : "Convert PDF to PowerPoint"}
      </button>
    </div>
  );
}