import { ActionPanel, Form, Action, LocalStorage, Toast, showToast } from "@raycast/api";
import { useState } from "react";

export default function CreateQuoteCommand() {
  const [quote, setQuote] = useState("");

  const handleSubmit = async () => {
    // Fetch the existing quotes
    const existingQuotesStr = (await LocalStorage.getItem("quotes")) as string;
    const existingQuotes = existingQuotesStr ? JSON.parse(existingQuotesStr) : [];
  
    // Fetch the current count
    const currentCountStr = (await LocalStorage.getItem("quoteCount")) as string;
    let currentCount = currentCountStr ? parseInt(currentCountStr) : 0;
  
    // Increment the count and add the new quote to the existing quotes with an ID
    const newQuote = { id: `qt${currentCount + 1}`, text: quote };
    const updatedQuotes = [...existingQuotes, newQuote];
  
    // Write the updated quotes and the updated count back to LocalStorage
    await LocalStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    await LocalStorage.setItem("quoteCount", `${currentCount + 1}`);

    // Show a toast after the quote is created
    await showToast(Toast.Style.Success, "Quote created", "You have created a new quote.");

    console.log("Quote added:", quote);
    console.log(updatedQuotes); // LOG TEST
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