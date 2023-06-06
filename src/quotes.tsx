import { useState, useEffect } from "react";
import { Detail } from "@raycast/api";
import { LocalStorage } from "@raycast/api";

export default function Command() {
  const [quote, setQuote] = useState("Loading...");

  useEffect(() => {
    const fetchQuotes = async () => {
      // Fetch the quotes from LocalStorage
      const quotesStr = (await LocalStorage.getItem("quotes")) as string;
      const quotes = quotesStr ? JSON.parse(quotesStr) : [];

      // Check if there are any quotes
      if (quotes.length === 0) {
        setQuote("No quotes available!");
      } else {
        // Choose a random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote.text);
      }
    };
    
    fetchQuotes();
  }, []);

  // Return the component
  return <Detail markdown={`## ${quote}`} />;
}
