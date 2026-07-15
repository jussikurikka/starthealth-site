import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const ClaudeQuickStart = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "";
  const mcpUrl = projectRef
    ? `https://${projectRef}.supabase.co/functions/v1/mcp`
    : "";

  const handleCopy = async () => {
    if (!mcpUrl) return;
    await navigator.clipboard.writeText(mcpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mcpUrl) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="opacity-75 hover:opacity-100 transition-opacity hover:underline text-sm"
        >
          {t("footer.claudeQuickStart")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("claudeQuickStart.title")}</DialogTitle>
          <DialogDescription>
            {t("claudeQuickStart.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 break-all rounded bg-muted px-2 py-1 text-xs">
              {mcpUrl}
            </code>
            <Button
              size="sm"
              onClick={handleCopy}
              variant="outline"
              aria-label={t("claudeQuickStart.copy")}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-2">
                {copied ? t("claudeQuickStart.copied") : t("claudeQuickStart.copy")}
              </span>
            </Button>
          </div>
          <ol className="list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
            <li>{t("claudeQuickStart.step1")}</li>
            <li>{t("claudeQuickStart.step2")}</li>
            <li>{t("claudeQuickStart.step3")}</li>
            <li>{t("claudeQuickStart.step4")}</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaudeQuickStart;
