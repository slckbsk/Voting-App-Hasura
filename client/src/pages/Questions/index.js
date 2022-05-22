import React from "react";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import { useSubscription } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

function Questions() {
  const { loading, error, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

  if (loading) return <Loading />;
  if (error) return <div> Error!: {error.message}</div>;

  return (
    <div>
      {data.questions.map((question) => (
        <div key={question.id}>
          <Link to={`/q/${question.id}`}>{question.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Questions;
