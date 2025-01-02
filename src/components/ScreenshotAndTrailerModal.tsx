"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactPlayer from "react-player";
export default function ScreenshotAndTrailerModal({
  isOpen,
  onClose,
  image,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  type: string;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="mx-auto max-w-4xl rounded-lg bg-white/10 backdrop-blur-md p-4"
        >
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-primary text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <DialogTitle className="text-lg font-medium text-white mb-4">
            {type === "screenshot" ? "Screenshot" : "Trailer"}
          </DialogTitle>
          <div className="relative">
            {type === "screenshot" && (
              <Image
                src={image}
                alt="Modal Image"
                className="max-w-full max-h-[80vh] object-contain"
                width={800}
                height={600}
              />
            )}
            {type === "trailer" && (
              <ReactPlayer url={image} width="100%" height="100%" controls />
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
