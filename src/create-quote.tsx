import { ActionPanel, Form, Action } from "@raycast/api";
import { LocalStorage } from "@raycast/api";
import { useState } from "react";

export default function CreateQuoteCommand() {
  const [quote, setQuote] = useState("");

  const handleSubmit = async () => {
    // Fetch the existing quotes
    const existingQuotesStr = (await LocalStorage.getItem("quotes")) as string;
    const existingQuotes = existingQuotesStr ? JSON.parse(existingQuotesStr) : [];

    // Add the new quote to the existing quotes
    const newQuote = { text: quote };
    const updatedQuotes = [...existingQuotes, newQuote];

    // Write the updated quotes back to the LocalStorage
    await LocalStorage.setItem("quotes", JSON.stringify(updatedQuotes));

    console.log("Quote added:", quote);
    console.log(updatedQuotes);
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