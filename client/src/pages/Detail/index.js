import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSubscription, useMutation } from "@apollo/client";
import { QUESTION_DETAIL_SUBSCRIPTION, NEW_VOTE_MUTATION } from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Detail() {
  const { id } = useParams();
  const [isVoted, setIsVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState();

  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    {
      variables: {
        id,
      },
    }
  );

  const [newVote, { loading: loadingVote, errorVote }] = useMutation(
    NEW_VOTE_MUTATION,
    {
      onCompleted: () => {
        setIsVoted(true);
      },
    }
  );

  const handleClickVote = () => {
    newVote({
      variables: { input: { option_id: selectedOptionId } },
    });
  };

  if (loading || loadingVote) return <Loading />;
  if (error || errorVote) return <Error message={error.message} />;

  const {
    questions_by_pk: { title, options },
  } = data;

  const total = options.reduce(
    (t, value) => t + value.votes_aggregate.aggregate.count,
    0
  );

  return (
    <div>
      <h2>{title}</h2>
      {options.map((option, i) => (
        <div className="vote_main" key={i}>
          <label htmlFor={i}>
            <input
              type="radio"
              name="selected"
              id={id}
              value={option.id}
              onChange={({ target }) => setSelectedOptionId(target.value)}
            />
            <span>{option.title}</span>
            {isVoted && (
              <span className="vote_count">
                (%
                {(
                  (option.votes_aggregate.aggregate.count * 100) /
                  (total === 0 ? 1 : total)
                ).toFixed(2)}
                )
              </span>
            )}
          </label>
          {isVoted && (
            <div>
              <progress
                value={option.votes_aggregate.aggregate.count}
                max={total}
              />
            </div>
          )}
        </div>
      ))}

      {!isVoted && (
        <button disabled={loadingVote} onClick={handleClickVote}>
          Vote
        </button>
      )}

      <div> TOPLAM OY : {total} </div>
    </div>
  );
}

export default Detail;
