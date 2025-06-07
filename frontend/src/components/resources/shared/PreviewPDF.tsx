import { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Icon,
  Dialog,
  Portal,
  Button,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { LuExpand } from "react-icons/lu";
import { Document, Page } from "react-pdf";

interface Props {
  pdf: string;
}

export const PreviewPDF = ({ pdf }: Props) => {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [scale, setScale] = useState(1);

  const updateContainerSize = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerWidth(width);
      setContainerHeight(height);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => updateContainerSize());
    return () => {
      window.removeEventListener("resize", () => updateContainerSize());
    };
  }, []);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => {
        updateContainerSize();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "=" || e.key === "-" || e.key === "0")
      ) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "0") {
          setScale(1);
        } else {
          setScale((prev) => {
            const delta = e.key === "-" ? -0.25 : 0.25;
            return Math.max(0.25, Math.min(prev + delta, 5));
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open && containerHeight > 0) {
      const fitScale = containerHeight / 800;
      setScale(fitScale);
    }
  }, [open, containerHeight]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"cover"}
      closeOnEscape={true}
      closeOnInteractOutside={true}
    >
      <Dialog.Trigger asChild>
        <IconButton unstyled cursor={"pointer"} color={"fg"} zIndex={"1"}>
          <Icon size={"sm"} as={LuExpand} />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content display={"flex"} flexDirection={"column"}>
            <Dialog.Header>
              <Dialog.Title>PDF preview</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body height={"100%"} flex={"1"} overflowY={"auto"} p={"0"}>
              <Flex
                width={"100%"}
                height={"100%"}
                align={"flex-start"}
                justify={"center"}
                ref={containerRef}
                overflowY={"auto"}
                scrollbarGutter={"stable"}
                background={"bg.muted"}
              >
                <Document
                  file={pdf}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                  {Array.from({ length: numPages ?? 0 }, (_, i) => (
                    <Page
                      key={`page_${i + 1}`}
                      pageNumber={i + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={scale}
                    />
                  ))}
                </Document>
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
