import React, { useState } from "react";
import { NEW_QUESTIONS_MUTATION } from "./queries";
import { useMutation } from "@apollo/client";

const initialOptions = [{ title: "" }, { title: "" }];

function New() {
  const [addQuestion, { loading , data }] = useMutation(
    NEW_QUESTIONS_MUTATION
  );

  const [title, setTitle] = useState("");

  const [options, setOptions] = useState(initialOptions);
  const handleChangeOption = ({ target }) => {
    const newArray = options;
    newArray[target.id].title = target.value;
    setOptions([...newArray]);
  };

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== "");

    if (title === "" || filledOptions.length < 2) return false;

    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          },
        },
      },
    });

    setTitle("");
    setOptions(initialOptions);
  };

  return (
    <div>
      <h3>Questions</h3>
      <input
        placeholder="Your Question"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
      />

      <h3>Options</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            placeholder="Your Options .."
            value={option.title}
            id={index}
            onChange={handleChangeOption}
            disabled={loading}
          />
        </div>
      ))}

      <button
        disabled={loading}
        onClick={() => setOptions([...options, { title: "" }])}
      >
        New option
      </button>

      <button disabled={loading} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default New;
