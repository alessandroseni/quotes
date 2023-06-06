import { ActionPanel, Form, Action, environment } from "@raycast/api";
import { useState } from "react";
import fs from "fs";
import path from "path";


export default function CreateQuoteCommand() {
  const [quote, setQuote] = useState("");

  const handleSubmit = () => {
    // Get the existing quotes
    const quotesPath = path.join(environment.assetsPath, "./quotes.json");
    const quotesContent = fs.readFileSync(quotesPath, "utf-8");
    const existingQuotes = fs.existsSync(quotesPath) ? JSON.parse(fs.readFileSync(quotesPath, "utf-8")) : []

    // Add the new quote to the existing quotes
    const newQuote = { text: quote };
    const updatedQuotes = [...existingQuotes, newQuote];

    // Write the updated quotes back to the file
    fs.writeFileSync(quotesPath, JSON.stringify(updatedQuotes, null, 2));

    console.log("Quote added:", quote);
    console.log(quotesPath);
    console.log(quotesContent);
    console.log(existingQuotes);
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Quote" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="quote" title="Quote" placeholder="Enter a quote..." defaultValue={quote} onChange={setQuote} />
    </Form>
  );
}
