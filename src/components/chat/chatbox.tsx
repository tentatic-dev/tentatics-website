"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "./chat-provider";

export default function Chatbox() {
  const { messages, isLoading } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Force scroll when new message is added
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [messages.length]);

  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let isInTable = false;
    let tableRows: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if line is a table row (contains |)
      if (line.includes("|") && line.trim() !== "") {
        if (!isInTable) {
          isInTable = true;
          tableRows = [];
        }
        tableRows.push(line);
        continue;
      } else {
        // If we were in a table and now we're not, render the table
        if (isInTable) {
          elements.push(renderTable(tableRows, elements.length));
          isInTable = false;
          tableRows = [];
        }
      }

      // Regular text processing
      if (line.trim() === "") {
        elements.push(<br key={elements.length} />);
      } else if (line.startsWith("###")) {
        elements.push(
          <h3 key={elements.length} className="text-lg font-bold mt-4 mb-2">
            {line.replace("###", "").trim()}
          </h3>
        );
      } else if (line.startsWith("##")) {
        elements.push(
          <h2 key={elements.length} className="text-xl font-bold mt-4 mb-2">
            {line.replace("##", "").trim()}
          </h2>
        );
      } else if (line.startsWith("---")) {
        elements.push(
          <hr key={elements.length} className="my-4 border-white/30" />
        );
      } else if (line.match(/^\d+\./)) {
        elements.push(
          <div key={elements.length} className="ml-4 mb-1">
            {renderTextWithFormatting(line)}
          </div>
        );
      } else {
        elements.push(
          <p key={elements.length} className="mb-2">
            {renderTextWithFormatting(line)}
          </p>
        );
      }
    }

    // Handle table at the end
    if (isInTable && tableRows.length > 0) {
      elements.push(renderTable(tableRows, elements.length));
    }

    return elements;
  };

  const renderTable = (rows: string[], key: number) => {
    const tableData = rows
      .filter((row) => row.trim() !== "" && !row.match(/^[\|\-\s]+$/))
      .map((row) =>
        row
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "")
      );

    if (tableData.length === 0) return null;

    const headers = tableData[0];
    const dataRows = tableData.slice(1);

    return (
      <div key={key} className="my-4 overflow-x-auto">
        <table className="w-full text-sm border border-white/30 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-white/10">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 text-left font-semibold border-b border-white/30"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-white/20 last:border-b-0"
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-3 py-2 align-top">
                    {renderTextWithFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTextWithFormatting = (text: string) => {
    return text.split(/(\*\*.*?\*\*|\*.*?\*|‑)/).map((part, idx) => {
      if (part.match(/^\*\*(.*?)\*\*$/)) {
        // Bold text
        return <strong key={idx}>{part.replace(/\*\*/g, "")}</strong>;
      } else if (part.match(/^\*(.*?)\*$/)) {
        // Italic text
        return <em key={idx}>{part.replace(/\*/g, "")}</em>;
      } else if (part === "‑") {
        // En-dash
        return <span key={idx}>–</span>;
      } else {
        return <span key={idx}>{part}</span>;
      }
    });
  };

  return (
    <main className="flex flex-col mx-auto h-full">
      <div className="mockup-window-inherit w-4xl h-full">
        <div className=" pb-8 overflow-auto flex-grow">
          {messages.length != 0 && (
            <>
              {messages.map((msg, i) => (
                <div
                  key={"chatKey" + i}
                  className={`chat ${
                    msg.role === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  {msg.role != "user" && (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Foto profil sample"
                          src="/logo-tentatics.svg"
                          className="bg-white p-2"
                        />
                      </div>
                    </div>
                  )}
                  {msg.role != "user" && (
                    <div className="chat-header text-white">
                      Tentabot{" "}
                      <time className="text-xs opacity-50">
                        {new Date(msg.ts).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  )}
                  <div
                    className={`rounded-xl p-3 break-words max-w-[75%] ${
                      msg.role === "user"
                        ? " bg-white/50 text-black/80 backdrop-blur-md"
                        : "bg-primary-dark text-white backdrop-blur-md"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="space-y-1">
                        {renderMessageContent(msg.content)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat chat-start">
                  <div className="">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
    </main>
  );
}
