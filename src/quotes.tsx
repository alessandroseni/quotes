import { ActionPanel, Action, List, Detail, environment } from "@raycast/api";
import fs from "fs";
import path from "path";

export default function Command() {
  // Define the path to the quotes file
  const quotesPath = path.join(environment.assetsPath, "./quotes.json");

  // Read the file content
  const quotesContent = fs.readFileSync(quotesPath, "utf-8");

  // Parse the content as JSON
  const quotes = JSON.parse(quotesContent);

  // Return the component
  return <Detail markdown={`## ${quotes[Math.floor(Math.random() * quotes.length)].text}`} />;
  
}