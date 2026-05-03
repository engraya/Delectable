import downloadPic from "@/images/download.svg";

export function ImageDownloader({
  imageUrl,
  filename,
}: {
  imageUrl: string | undefined;
  filename: string | undefined;
}) {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename ?? "downloaded-image";
    link.rel = "noopener";
    link.click();
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center justify-center"
      aria-label="Download recipe image"
      disabled={!imageUrl}
    >
      <img src={downloadPic} className="h-7 w-7" alt="" />
    </button>
  );
}
