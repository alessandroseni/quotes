import { ActionPanel, List, LocalStorage, Form, Action } from "@raycast/api";
import { useState, useEffect } from "react";

interface Quote {
  id: string;
  text: string;
}

interface EditQuoteFormProps {
  id: string,
  initialText: string,
  onEdit: (newText: string) => void,
}

function EditQuoteForm(props: EditQuoteFormProps) {
  const [quote, setQuote] = useState(props.initialText);

  const handleSubmit = () => {
    props.onEdit(quote);
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

export default function ManageQuotesCommand() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const fetchQuotes = async () => {
    const quotesStr = (await LocalStorage.getItem("quotes")) as string;
    const quotes = quotesStr ? JSON.parse(quotesStr) : [];
    setQuotes(quotes);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id: string) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id);
    await LocalStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    fetchQuotes();
  };

  const handleEdit = async (id: string, newText: string) => {
    const updatedQuotes = quotes.map((quote) => quote.id === id ? {...quote, text: newText} : quote);
    await LocalStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    fetchQuotes();
  };

  return (
    <List searchBarPlaceholder="Filter quotes by text...">
      {quotes.map((quote) => (
        <List.Item
          id={quote.id}
          title={quote.text}
          actions={
            <ActionPanel>
              <Action.Push
              title="Edit"
              icon="pencil"
              target={<EditQuoteForm id={quote.id} initialText={quote.text} onEdit={(newText) => handleEdit(quote.id, newText)} />}
              />
              <ActionPanel.Item title="Delete" icon="trash" onAction={() => handleDelete(quote.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
