import downloadPic from "@/images/download.svg";
import { Button } from "@/shared/ui/Button";

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
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="rounded-xl px-3"
      onClick={handleDownload}
      aria-label="Download recipe image"
      disabled={!imageUrl}
    >
      <img src={downloadPic} className="h-5 w-5 dark:invert" alt="" />
    </Button>
  );
}
