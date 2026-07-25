"use client";

import Link from "next/link";
import { Search, Wrench, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";

function Highlight({ text, query }: { text: string; query: string }) {
  const value = query.trim();
  if (!value) return text;

  const index = text.toLowerCase().indexOf(value.toLowerCase());
  if (index < 0) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-[#EFD9C0] px-0.5 text-inherit">
        {text.slice(index, index + value.length)}
      </mark>
      {text.slice(index + value.length)}
    </>
  );
}

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    return tools
      .filter((tool) =>
        `${tool.title} ${tool.description} ${tool.category}`
          .toLowerCase()
          .includes(value),
      )
      .slice(0, 10);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    }

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  function clearSearch() {
    setQuery("");
    setFocused(true);
    inputRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      if (query) clearSearch();
      else setFocused(false);
      return;
    }

    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + results.length) % results.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      router.push(results[activeIndex].href);
      setFocused(false);
    }
  }

  const listboxId = "tool-search-results";
  const isOpen = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className="relative z-[100] mx-auto w-full max-w-4xl">
      <div className="flex w-full items-center rounded-3xl border border-[#E6D8C8] bg-[#FFFCF8] px-5 py-4 shadow-[0_20px_50px_rgba(120,90,60,.10)] backdrop-blur-xl transition-all duration-300 focus-within:border-[#B68D62] focus-within:shadow-[0_25px_60px_rgba(182,141,98,.30)] sm:px-7 sm:py-5">
        <Search
          size={24}
          aria-hidden="true"
          className="mr-4 shrink-0 text-[#A7744D] sm:mr-5"
        />

        <input
          ref={inputRef}
          value={query}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setFocused(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for a tool..."
          aria-label="Search all AllToolkit tools"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={
            results.length ? `tool-search-option-${activeIndex}` : undefined
          }
          role="combobox"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#2D241C] placeholder:text-[#9A8B7D] focus:outline-none sm:text-lg"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8B7A6C] transition hover:bg-[#F3E7DB] hover:text-[#5A4A3E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B68D62]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Tool search results"
          className="absolute inset-x-0 top-full z-[110] mt-3 w-full overflow-hidden rounded-3xl border border-[#E6D8C8] bg-[#FFFCF8]/[0.99] shadow-[0_25px_70px_rgba(120,90,60,.22)] backdrop-blur-xl sm:mt-4"
        >
          <div className="max-h-[min(60vh,32rem)] overflow-y-auto overscroll-contain p-2 [scrollbar-gutter:stable_both-edges] sm:p-2.5">
            {results.length === 0 && (
              <div className="flex min-h-24 items-center justify-center px-5 py-6 text-center text-[#7A6A5D] sm:px-7">
                No tools found. Try another word.
              </div>
            )}

            {results.map((tool, index) => (
              <Link
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`tool-search-option-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                key={tool.id}
                href={tool.href}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setFocused(false)}
                className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition sm:px-5 sm:py-4 ${
                  activeIndex === index
                    ? "bg-[#F3E7DB]"
                    : "hover:bg-[#F7F0E9]"
                }`}
              >
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-[#2D241C]">
                    <Highlight text={tool.title} query={query} />
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#6B5B4D]">
                    <Highlight text={tool.description} query={query} />
                  </p>
                </div>

                <div className="hidden max-w-40 shrink-0 items-center gap-2 rounded-full border border-[#EADFD3] bg-white/90 px-3 py-2 text-xs font-semibold text-[#A7744D] shadow-sm sm:flex">
                  <Wrench size={14} aria-hidden="true" />
                  <span className="truncate">{tool.category}</span>
                </div>
              </Link>
            ))}

            {results.length === 10 && (
              <div className="px-5 py-3 text-center text-xs font-semibold text-[#8B7A6C]">
                Keep typing to narrow the results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
