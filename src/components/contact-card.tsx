"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Mail, Loader2 } from "lucide-react";

export function ContactCard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    const formBody = new URLSearchParams(
      formDataObj as Record<string, string>
    ).toString();

    try {
      const response = await fetch("https://formspree.io/f/mojaqjbk", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formBody,
      });

      if (response.ok) {
        setSubmitStatus("success");
        formRef.current?.reset();
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        id="contact"
        className="flex h-full w-full flex-col justify-between gap-2"
      >
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium leading-tight">
            Redemptive Design
          </p>
          <p className="text-[10px] text-muted-foreground leading-snug">
            Building technology that serves. I make things to help people.
            Support me by telling me how to help you, or partner with me to help
            others.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setIsOpen(true)}
          >
            <Mail className="size-3" />
            <span className="hidden sm:inline">Email</span>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="flex-1 text-xs"
          >
            <a
              href="https://github.com/jadamkraft"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="size-3" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Get in Touch</DialogTitle>
            <DialogDescription>
              Send me a message and I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                required
                rows={5}
                disabled={isSubmitting}
              />
            </div>
            {submitStatus === "success" && (
              <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again or reach out directly.
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
